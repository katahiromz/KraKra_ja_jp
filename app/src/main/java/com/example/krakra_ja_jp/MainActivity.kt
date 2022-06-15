package com.katahiromz.krakra_ja_jp

import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import android.speech.tts.TextToSpeech
import java.util.*

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {
    var webView : WebView? = null
    var loaded : Boolean = false
    var thread : MyThread? = null
    var resultString : String = ""
    var url : String = "https://katahiromz.github.io/saimin/"
    var tts : TextToSpeech? = null
    var speechReady : Boolean = false

    fun init() {
        Log.d("MainActivity", "init")
        // get version info
        var appName : String = this.packageName
        var pm : PackageManager = this.packageManager
        var pi : PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        var versionName : String = pi.versionName

        webView = findViewById(R.id.webview)

        webView?.post {
            // modify web settings
            var settings = webView?.settings
            settings?.javaScriptEnabled = true
            settings?.domStorageEnabled = true
            if (BuildConfig.DEBUG) {
                WebView.setWebContentsDebuggingEnabled(true)
            }

            // modify user-agent string
            var userAgentString: String? = settings?.userAgentString
            if (userAgentString != null) {
                userAgentString += "/KraKra-native-app/" + versionName + "/"
                settings?.userAgentString = userAgentString
            }
        }

        webView?.post {
            webView?.webViewClient = MyWebViewClient(this)
            webView?.webChromeClient = MyWebChromeClient(this)
            webView?.loadUrl(url)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d("MainActivity", "onCreate")
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        this.tts = TextToSpeech(this, this)
    }

    fun speechText(text: String) {
        if (speechReady) {
            var params = Bundle()
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 0.8f)
            tts!!.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    // for TextToSpeech
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            speechReady = true
            val locale = Locale.ENGLISH
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
        }
    }
    override fun onStart() {
        Log.d("MainActivity","onStart")
        super.onStart()
    }

    fun showPopup() {
        // TODO:
    }

    override fun onAttachedToWindow() {
        Log.d("MainActivity", "onAttachedToWindow")
        super.onAttachedToWindow()
        if (!loaded) {
            loaded = true
            showPopup()
            thread = MyThread(this)
            thread?.start()
        }
    }

    class MyWebViewClient(activity: MainActivity) : WebViewClient() {
        var mainActivity : MainActivity = activity
        
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            return false
        }

        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
        }
    }

    class MyWebChromeClient(activity: MainActivity) : WebChromeClient() {
        var mainActivity : MainActivity = activity

        override fun onJsAlert(view: WebView?, url: String?, message: String?, result: JsResult?): Boolean {
            return super.onJsAlert(view, url, message, result)
        }

        override fun onJsPrompt(view: WebView?, url: String?, message: String?, defaultValue: String?, result: JsPromptResult?): Boolean {
            return super.onJsPrompt(view, url, message, defaultValue, result)
        }

        override fun onJsConfirm(view: WebView?, url: String?, message: String?, result: JsResult?): Boolean {
            return super.onJsConfirm(view, url, message, result)
        }

        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            if (BuildConfig.DEBUG && consoleMessage != null) {
                var msg = consoleMessage.message()
                var line = consoleMessage.lineNumber()
                var src = consoleMessage.sourceId()
                Log.d("console","${msg} at Line ${line} of ${src}")
            }
            return super.onConsoleMessage(consoleMessage)
        }
    }

    class MyThread(activity: MainActivity) : Thread() {
        var mainActivity : MainActivity = activity

        public override fun run() {
            mainActivity.init()
        }
    }

    override fun onResume() {
        super.onResume()
        webView?.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView?.onPause()
    }

    fun executeScript(script: String) {
        // onReceiveValue will receive value
        webView?.evaluateJavascript(script, this)
    }

    // ValueCallback<String>
    override fun onReceiveValue(value: String) {
        resultString = value
    }
}