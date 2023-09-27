// KraKraのメインアクティビティ。
// Copyright (c) 2023 Katayama Hirofumi MZ. All Rights Reserved.

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
        // 別スレッドかもしれないので、postする。
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
                webView?.evaluateJavascript("SAI_AndroidMicrophoneOnReload()", null)
            } else {
                // Permission request was denied.
                showSnackbar(getLocString(R.string.no_audio_record), ACTION_SNACK_OK)
            }
        }
        // TODO: Add more request
    }

    /////////////////////////////////////////////////////////////////////
    // イベントハンドラ関連

    // アクティビティの作成時。
    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.i("onCreate")

        // 最初の画面を表示する。
        installSplashScreen()

        super.onCreate(savedInstanceState)

        // レイアウト ビューを指定する。
        setContentView(R.layout.activity_main)

        // アクションバーを隠す。
        if (false) { // Theme.MaterialComponents.DayNight.NoActionBarで指定できるので省略。
            supportActionBar?.hide()
        }

        // WebViewを初期化。
        initWebView()

        // TextToSpeechを初期化。
        initTextToSpeech()

        // Timberを初期化。
        initTimber()
    }

    // アクティビティの開始時。
    override fun onStart() {
        Timber.i("onStart")
        super.onStart() // 親にも伝える。
    }

    // アクティビティの復帰時。
    override fun onResume() {
        Timber.i("onResume")
        super.onResume() // 親にも伝える。

        // ウェブビューを復帰。
        webView?.onResume()

        // テキストがあればスピーチを再開。
        if (theText != "") {
            speechText(theText)
        }

        // クロームクライアントを復帰。
        chromeClient?.onResume()

        // 明るさを復帰。
        setBrightness(screenBrightness);
    }

    // アクティビティの一時停止時。
    override fun onPause() {
        Timber.i("onPause")
        super.onPause() // 親にも伝える。

        // ウェブビューも一時停止。
        webView?.onPause()

        // スピーチを停止する。
        stopSpeech()
    }

    // アクティビティの停止時。
    override fun onStop() {
        Timber.i("onStop")
        super.onStop() // 親にも伝える。

        // ウェブビューを一時停止。
        webView?.onPause()

        // スピーチを停止する。
        stopSpeech()
    }

    // アクティビティの破棄時。
    override fun onDestroy() {
        Timber.i("onDestroy")

        // ウェブビューを破棄。
        webView?.destroy()

        // TextToSpeechを破棄。
        tts?.shutdown()

        super.onDestroy() // 親にも伝える。
    }

    // 値を受け取るのに使う。ValueCallback<String>より継承。
    override fun onReceiveValue(value: String) {
        resultString = value
    }
    private var resultString = ""

    /////////////////////////////////////////////////////////////////////
    // WebView関連

    // ウェブビュー オブジェクト。
    private var webView: WebView? = null

    // クロームクライアント。
    private var chromeClient: MyWebChromeClient? = null

    // ウェブビューを初期化する。
    private fun initWebView() {
        // ウェブビューのビューを取得する。
        webView = findViewById(R.id.web_view)

        // この処理は別スレッドかもしれないので、postを活用。
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

    // ウェブビュー クライアントを初期化する。
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

    // クロームクライアントを初期化する。
    private fun initChromeClient() {
        // まず、クロームクライアントを作成する。
        chromeClient = MyWebChromeClient(this, object : MyWebChromeClient.Listener {
            override fun onChromePermissionRequest(permissions: Array<String>, requestCode: Int) {
                requestPermissions(permissions, requestCode)
            }

            override fun onSpeech(text: String) {
                Timber.i("onSpeech")
                theText = text // スピーチテキストをセットする。
                speechText(text) // スピーチを開始する。
            }

            override fun onShowToast(text: String, typeOfToast: Int) {
                showToast(text, typeOfToast) // Toastを表示する。
            }

            override fun onShowSnackbar(text: String, typeOfSnack: Int) {
                showSnackbar(text, typeOfSnack) // Snackbarを表示する。
            }

            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                val bar: ProgressBar = findViewById(R.id.progressBar)
                bar.progress = newProgress
                if (newProgress == 100)
                    bar.visibility = View.INVISIBLE // 進捗が完了したらプログレスを非表示にする。
            }

            override fun onBrightness(value: String) {
                setBrightness(value) // 明るさを指定する。
            }
        })
        webView?.webChromeClient = chromeClient

        // JavaScript側からメソッドを呼び出せるインターフェイスを提供する。
        webView?.addJavascriptInterface(chromeClient!!, "android")

        // URLを指定してウェブページを読み込む。
        webView?.loadUrl(getLocString(R.string.url))
    }

    // ウェブ設定を初期化する。
    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebSettings() {
        // 背景色は黒。
        webView?.setBackgroundColor(0)

        // 設定を取得する。
        val settings = webView?.settings
        if (settings == null)
            return

        settings.javaScriptEnabled = true // JavaScriptを有効化。
        settings.domStorageEnabled = true // localStorageを有効化。
        settings.mediaPlaybackRequiresUserGesture = false // ジェスチャーなくてもメディア反応可。
        if (BuildConfig.DEBUG) {
            settings.cacheMode = WebSettings.LOAD_NO_CACHE // デバッグ中はキャッシュしない。
            WebView.setWebContentsDebuggingEnabled(true) // デバッギングを有効にする。
        }

        // JavaSciprt側からKraKraのバージョン情報を取得できるようにする。
        val versionName = getVersionName()
        settings.userAgentString += "/KraKra-native-app/$versionName/"
    }

    // バージョン名を取得する。
    private fun getVersionName(): String {
        val appName: String = this.packageName
        val pm: PackageManager = this.packageManager
        val pi: PackageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            pm.getPackageInfo(appName, PackageManager.PackageInfoFlags.of(PackageManager.GET_META_DATA.toLong()))
        } else {
            @Suppress("DEPRECATION")
            pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        }
        return pi.versionName
    }

    /////////////////////////////////////////////////////////////////////
    // ロケール関連
    //
    var currLocale: Locale = Locale.ENGLISH
    var currLocaleContext: Context? = null

    // 現在のロケールをセットする。
    fun setCurLocale(locale: Locale) {
        currLocale = locale
        currLocaleContext = null

        // TextToSpeechにもロケールをセットする。
        if (tts != null) {
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
        }
    }

    // ローカライズされた文字列を取得する。複数ロケール対応のため、特殊な実装が必要。
    fun getLocString(id: Int, locale: Locale): String {
        if (currLocaleContext == null) {
            currLocaleContext = applicationContext.createLocalizedContext(locale)
        }
        return currLocaleContext!!.getString(id)
    }
    fun getLocString(id: Int): String {
        return getLocString(id, currLocale);
    }

    // KraKraの既定のメッセージリストを取得する。
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
    private var tts: TextToSpeech? = null // TextToSpeechオブジェクト。
    private var isSpeechReady = false // スピーチの準備が完了したか？
    private var theText = "" // スピーチテキスト。

    // TextToSpeechを初期化する。
    private fun initTextToSpeech() {
        run {
            tts = TextToSpeech(this, this)
            var locale = currLocale
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
        }
    }

    // TextToSpeechのために用意された初期化完了ルーチン。
    // TextToSpeech.OnInitListener
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isSpeechReady = true
        }
    }

    // スピーチを開始する。
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

    // スピーチを停止する。
    private fun stopSpeech() {
        if (isSpeechReady) {
            val params = Bundle()
            tts?.speak("", TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }
}