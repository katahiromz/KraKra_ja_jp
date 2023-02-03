package com.katahiromz.krakra_ja_jp

import android.annotation.SuppressLint
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Process
import android.speech.tts.TextToSpeech
import android.util.Log
import android.view.View
import android.webkit.*
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.google.android.material.snackbar.Snackbar
import java.util.*
import timber.log.Timber

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

    // 定数。
    companion object {
        // トーストの種類 (showToast用)
        const val SHORT_TOAST = 0
        const val LONG_TOAST = 1

        // スナックの種類 (showSnackbar用)
        const val SHORT_SNACK = 0
        const val LONG_SNACK = 1
        const val ACTION_SNACK_OK = 2
        // TODO: Add more snack
    }

    // Toast を表示する。
    @JavascriptInterface
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
    @JavascriptInterface
    fun cancelToast() {
        if (lastToast != null) {
            lastToast?.cancel()
            lastToast = null
        }
    }

    // Snackbar を表示する。
    @JavascriptInterface
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
                val buttonText = getString(R.string.ok)
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
        if (requestCode == MyWebChromeClient.MY_WEBVIEW_REQUEST_CODE_01) {
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
                showSnackbar(getString(R.string.no_audio_record), ACTION_SNACK_OK)
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
        webViewThread = WebViewThread(this)
        webViewThread?.start()

        // TextToSpeechを初期化。
        ttsThread = TtsThread(this)
        ttsThread?.start()

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
    private var webViewThread: WebViewThread? = null

    fun initWebView() {
        webView = findViewById(R.id.web_view)
        webView?.post {
            webView?.setBackgroundColor(0)
            initWebSettings()
        }
        webView?.post {
            webView?.webViewClient = MyWebViewClient(object: MyWebViewClient.Listener {
                override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                             error: WebResourceError?)
                {
                    Timber.i("onReceivedError")
                }

                override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                                 errorResponse: WebResourceResponse?)
                {
                    Timber.i("onReceivedHttpError")
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    Timber.i("onPageFinished")
                    findViewById<TextView>(R.id.loading).visibility = View.GONE
                }
            })

            chromeClient = MyWebChromeClient(this, object: MyWebChromeClient.Listener {
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
            })
            webView?.webChromeClient = chromeClient
            webView?.addJavascriptInterface(chromeClient!!, "android")
            webView?.loadUrl(getString(R.string.url))
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebSettings() {
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

    class WebViewThread(private val activity: MainActivity) : Thread() {
        override fun run() {
            Process.setThreadPriority(Process.THREAD_PRIORITY_MORE_FAVORABLE)
            activity.initWebView()
        }
    }

    /////////////////////////////////////////////////////////////////////
    // TextToSpeech関連
    //
    private var tts: TextToSpeech? = null
    private var ttsThread: TtsThread? = null
    private var isSpeechReady = false
    private var theText = ""

    private fun initTextToSpeech() {
        tts = TextToSpeech(this, this)
        var locale = Locale.JAPANESE // {{language-dependent}}
        if (BuildConfig.DEBUG)
            locale = Locale.ENGLISH
        if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
            tts!!.language = locale
        }
    }

    class TtsThread(private val activity: MainActivity) : Thread() {
        override fun run() {
            activity.initTextToSpeech()
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