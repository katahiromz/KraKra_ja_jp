package com.katahiromz.krakra_ja_jp

import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.os.LocaleList
import android.speech.tts.TextToSpeech
import android.view.View
import android.view.WindowInsets
import android.view.WindowInsetsController.BEHAVIOR_SHOW_BARS_BY_SWIPE
import android.view.WindowInsetsController.BEHAVIOR_SHOW_BARS_BY_TOUCH
import android.view.WindowManager
import android.webkit.*
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.google.android.material.snackbar.Snackbar
import createLocalizedContext
import timber.log.Timber
import java.util.*


/////////////////////////////////////////////////////////////////////
// 定数。

// トーストの種類 (showToast用)
const val SHORT_TOAST = 0
const val LONG_TOAST = 1

// スナックの種類 (showSnackbar用)
const val SHORT_SNACK = 0
const val LONG_SNACK = 1
const val ACTION_SNACK_OK = 2
// TODO: Add more snack

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener,
        ActivityCompat.OnRequestPermissionsResultCallback {
    /////////////////////////////////////////////////////////////////////
    // 共通

    // デバッグログにTimberを使用する。
    fun initTimber() {
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }

    // Toast を表示する。
    fun showToast(text: String, typeOfToast: Int) {
        when (typeOfToast) {
            SHORT_TOAST -> {
                lastToast = Toast.makeText(this, text, Toast.LENGTH_SHORT)
                lastToast?.show()
            }
            LONG_TOAST -> {
                lastToast = Toast.makeText(this, text, Toast.LENGTH_LONG)
                lastToast?.show()
            }
            else -> {
                require(false, { "typeOfToast: $typeOfToast" })
            }
        }
    }
    var lastToast : Toast? = null
    // Toastをキャンセルする。
    fun cancelToast() {
        if (lastToast != null) {
            lastToast?.cancel()
            lastToast = null
        }
    }

    // Snackbar を表示する。
    fun showSnackbar(text: String, typeOfSnack: Int) {
        val view = findViewById<View>(android.R.id.content)
        when (typeOfSnack) {
            SHORT_SNACK -> {
                lastSnackbar = Snackbar.make(view, text, Snackbar.LENGTH_SHORT)
                lastSnackbar?.show()
            }
            LONG_SNACK -> {
                lastSnackbar = Snackbar.make(view, text, Snackbar.LENGTH_LONG)
                lastSnackbar?.show()
            }
            ACTION_SNACK_OK -> {
                lastSnackbar = Snackbar.make(view, text, Snackbar.LENGTH_INDEFINITE)
                val buttonText = getLocString(R.string.ok)
                lastSnackbar?.setAction(buttonText) {
                    // TODO: Add action
                }
                lastSnackbar?.show()
            }
            // TODO: Add more Snack
            else -> {
                require(false, { "typeOfSnack: $typeOfSnack" })
            }
        }
    }
    var lastSnackbar : Snackbar? = null
    // Snackbarをキャンセルする。
    @JavascriptInterface
    fun cancelSnackbar() {
        if (lastSnackbar != null) {
            lastSnackbar?.dismiss()
            lastSnackbar = null
        }
    }

    // 画面の明るさを調整する。
    var screenBrightness: String = "normal"
    fun setBrightness(value: String) {
        runOnUiThread {
            val params: WindowManager.LayoutParams = window.attributes
            if (value == "brighter") {
                params.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_FULL
            } else {
                params.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
            }
            window.attributes = params
        }

        screenBrightness = value
    }

    // ナビゲーションバーの表示・非表示。
    var showingNaviBar: Boolean = true

    // ナビゲーションバーの表示の切り替え。
    @Suppress("DEPRECATION")
    fun showNaviBar(show: Boolean) {
        webView?.post {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) { // API 30以上の場合
                if (show) {
                    window.decorView.windowInsetsController?.show(
                            WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()
                    )
                } else {
                    window.decorView.windowInsetsController?.hide(
                            WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()
                    )
                }
            } else { // API 30未満の場合
                if (show) {
                    window.decorView.systemUiVisibility = 0
                } else {
                    window.decorView.systemUiVisibility = (
                        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
                        View.SYSTEM_UI_FLAG_FULLSCREEN or
                        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
                        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN)
                }
            }
        }
        showingNaviBar = show
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        showNaviBar(showingNaviBar)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
    }

    /////////////////////////////////////////////////////////////////////
    // パーミッション関連

    override fun onRequestPermissionsResult(
            requestCode: Int,
            permissions: Array<String>,
            grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        var grantedAll = true
        // 音声の要求。
        if (requestCode == MY_WEBVIEW_REQUEST_CODE_01) {
            for (result in grantResults) {
                if (result != PackageManager.PERMISSION_GRANTED) {
                    grantedAll = false
                }
            }
            if (grantedAll) {
                // Permission has been granted.
                webView?.evaluateJavascript("AndroidMicrophoneOnReload()", null)
            } else {
                // Permission request was denied.
                showSnackbar(getLocString(R.string.no_audio_record), ACTION_SNACK_OK)
            }
        }
        // TODO: Add more request
    }

    /////////////////////////////////////////////////////////////////////
    // イベントハンドラ関連

    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.i("onCreate")
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()

        // WebViewを初期化。
        initWebView()

        // TextToSpeechを初期化。
        initTextToSpeech()

        // Timberを初期化。
        initTimber()
    }

    override fun onStart() {
        Timber.i("onStart")
        super.onStart()
    }

    override fun onResume() {
        Timber.i("onResume")
        super.onResume()
        webView?.onResume()
        if (theText != "") {
            speechText(theText)
        }
        chromeClient?.onResume()
        setBrightness(screenBrightness);
    }

    override fun onPause() {
        Timber.i("onPause")
        super.onPause()
        webView?.onPause()
        stopSpeech()
    }

    override fun onStop() {
        Timber.i("onStop")
        super.onStop()
        webView?.onPause()
        stopSpeech()
    }

    override fun onDestroy() {
        Timber.i("onDestroy")
        webView?.destroy()
        tts?.shutdown()
        super.onDestroy()
    }

    // ValueCallback<String>
    override fun onReceiveValue(value: String) {
        resultString = value
    }
    private var resultString = ""

    /////////////////////////////////////////////////////////////////////
    // WebView関連

    private var webView: WebView? = null
    private var chromeClient: MyWebChromeClient? = null

    private fun initWebView() {
        webView = findViewById(R.id.web_view)
        webView?.post {
            initWebSettings()
        }
        webView?.post {
            initWebViewClient()
        }
        webView?.post {
            initChromeClient()
        }
    }

    private fun initWebViewClient() {
        webView?.webViewClient = MyWebViewClient(object : MyWebViewClient.Listener {
            override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                         error: WebResourceError?) {
                Timber.i("onReceivedError")
            }

            override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                             errorResponse: WebResourceResponse?) {
                Timber.i("onReceivedHttpError")
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                Timber.i("onPageFinished")
                findViewById<TextView>(R.id.loading).visibility = View.GONE
            }
        })
    }

    private fun initChromeClient() {
        chromeClient = MyWebChromeClient(this, object : MyWebChromeClient.Listener {
            override fun onChromePermissionRequest(permissions: Array<String>, requestCode: Int) {
                requestPermissions(permissions, requestCode)
            }

            override fun onSpeech(text: String) {
                Timber.i("onSpeech")
                theText = text
                speechText(text)
            }

            override fun onShowToast(text: String, typeOfToast: Int) {
                showToast(text, typeOfToast)
            }

            override fun onShowSnackbar(text: String, typeOfSnack: Int) {
                showSnackbar(text, typeOfSnack)
            }

            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                val bar: ProgressBar = findViewById(R.id.progressBar)
                bar.progress = newProgress
                if (newProgress == 100)
                    bar.visibility = View.INVISIBLE
            }

            override fun onBrightness(value: String) {
                setBrightness(value)
            }
        })
        webView?.webChromeClient = chromeClient
        webView?.addJavascriptInterface(chromeClient!!, "android")
        webView?.loadUrl(getLocString(R.string.url))
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebSettings() {
        webView?.setBackgroundColor(0)
        val settings = webView?.settings
        if (settings == null)
            return
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.mediaPlaybackRequiresUserGesture = false
        if (BuildConfig.DEBUG) {
            settings.cacheMode = WebSettings.LOAD_NO_CACHE
            WebView.setWebContentsDebuggingEnabled(true)
        }
        val versionName = getVersionName()
        settings.userAgentString += "/KraKra-native-app/$versionName/"
    }

    private fun getVersionName(): String {
        val appName: String = this.packageName
        val pm: PackageManager = this.packageManager
        val pi: PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        return pi.versionName
    }

    /////////////////////////////////////////////////////////////////////
    // ロケール関連
    //
    var currLocale: Locale = Locale.ENGLISH
    var currLocaleContext: Context? = null

    fun setCurLocale(locale: Locale) {
        currLocale = locale
        currLocaleContext = null
        if (tts != null) {
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
        }
    }

    fun getLocString(id: Int, locale: Locale): String {
        if (currLocaleContext == null) {
            currLocaleContext = applicationContext.createLocalizedContext(locale)
        }
        return currLocaleContext!!.getString(id)
    }

    fun getLocString(id: Int): String {
        return getLocString(id, currLocale);
    }

    fun getDefaultMessageList(): MutableList<String> {
        currLocaleContext = null
        var ret: MutableList<String> = mutableListOf<String>()
        for (id in R.string.message_000 .. R.string.message_049) {
            ret.add(getLocString(id))
        }
        return ret
    }

    /////////////////////////////////////////////////////////////////////
    // TextToSpeech関連
    //
    private var tts: TextToSpeech? = null
    private var isSpeechReady = false
    private var theText = ""

    private fun initTextToSpeech() {
        run {
            tts = TextToSpeech(this, this)
            var locale = currLocale
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
        }
    }

    // TextToSpeech.OnInitListener
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isSpeechReady = true
        }
    }

    fun speechText(text: String) {
        if (isSpeechReady) {
            val params = Bundle()
            val volume = 0.5f
            val speed = 0.3f
            val pitch = 0.8f
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, volume)
            tts?.setPitch(pitch)
            tts?.setSpeechRate(speed)
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    private fun stopSpeech() {
        if (isSpeechReady) {
            val params = Bundle()
            tts?.speak("", TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }
}