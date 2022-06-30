package com.katahiromz.krakra_ja_jp

import android.annotation.SuppressLint
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.util.Log
import android.view.View
import android.webkit.*
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import java.util.*

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {

    companion object {
        const val requestCodePermissionAudio = 1
    }

    private lateinit var webView: WebView
    private lateinit var tts: TextToSpeech
    private lateinit var webViewThread: WebViewThread
    private lateinit var ttsThread: TtsThread

    private var resultString = ""
    private var isSpeechReady = false
    private var theText = ""

    private fun logD(msg: String?, tr: Throwable? = null) {
        if (BuildConfig.DEBUG) {
            Log.d("MainActivity", msg, tr)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        logD("onCreate")
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        if (false) {
            initWebView()
            initTextToSpeech()
        } else {
            webViewThread = WebViewThread(this)
            webViewThread.start()
            ttsThread = TtsThread(this)
            ttsThread.start()
        }
    }

    override fun onStart() {
        logD("onStart")
        super.onStart()
    }

    override fun onResume() {
        logD("onResume")
        super.onResume()
        webView.onResume()
        if (theText != "") {
            speechText(theText)
        }
    }

    override fun onPause() {
        logD("onPause")
        super.onPause()
        webView.onPause()
        stopSpeech()
    }

    override fun onStop() {
        logD("onStop")
        super.onStop()
        webView.onPause()
        stopSpeech()
    }

    override fun onDestroy() {
        logD("onDestroy")
        webView.destroy()
        tts.shutdown()
        super.onDestroy()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray)
    {
        if (requestCode == requestCodePermissionAudio) {
            if (grantResults.isNotEmpty()) {
                if (grantResults[0] != PackageManager.PERMISSION_GRANTED) {
                    logD("Not PERMISSION_GRANTED!")
                }
            }
        }
    }

    // ValueCallback<String>
    override fun onReceiveValue(value: String) {
        resultString = value
    }

    fun initWebView() {
        webView = findViewById(R.id.web_view)
        webView.post {
            webView.setBackgroundColor(0)
            initWebSettings()
        }
        webView.post {
            webView.webViewClient = MyWebViewClient(object: MyWebViewClient.Listener {
                override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                             error: WebResourceError?)
                {
                    logD("onReceivedError")
                }

                override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                                 errorResponse: WebResourceResponse?)
                {
                    logD("onReceivedHttpError")
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    logD("onPageFinished")
                    findViewById<TextView>(R.id.loading).visibility = View.GONE
                }
            })

            val chromeClient = MyWebChromeClient(this, object: MyWebChromeClient.Listener {
                override fun onSpeech(text: String) {
                    logD("onSpeech")
                    theText = text
                    speechText(text)
                }
            })
            webView.webChromeClient = chromeClient
            webView.addJavascriptInterface(chromeClient, "android")
            webView.loadUrl(getString(R.string.url))
        }
    }

    // TextToSpeech.OnInitListener
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isSpeechReady = true
        }
    }

    private fun initTextToSpeech() {
        tts = TextToSpeech(this, this)
        var locale = Locale.JAPANESE // {{language-dependent}}
        if (BuildConfig.DEBUG)
            locale = Locale.ENGLISH
        if (tts.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
            tts.language = locale
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebSettings() {
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.mediaPlaybackRequiresUserGesture = false
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        val versionName = getVersionName()
        updateUserAgent(settings, versionName)
    }

    private fun updateUserAgent(settings: WebSettings, versionName: String) {
        var userAgent: String? = settings.userAgentString
        if (userAgent != null) {
            userAgent += "/KraKra-native-app/$versionName/"
            settings.userAgentString = userAgent
        }
    }

    private fun getVersionName(): String {
        val appName: String = this.packageName
        val pm: PackageManager = this.packageManager
        val pi: PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        return pi.versionName
    }

    fun speechText(text: String) {
        if (isSpeechReady) {
            val params = Bundle()
            val volume = 0.5f
            val speed = 0.3f
            val pitch = 0.8f
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, volume)
            tts.setPitch(pitch)
            tts.setSpeechRate(speed)
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    private fun stopSpeech() {
        if (isSpeechReady) {
            val params = Bundle()
            tts.speak("", TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    class WebViewThread(private val activity: MainActivity) : Thread() {
        override fun run() {
            activity.initWebView()
        }
    }

    class TtsThread(private val activity: MainActivity) : Thread() {
        override fun run() {
            activity.initTextToSpeech()
        }
    }
}