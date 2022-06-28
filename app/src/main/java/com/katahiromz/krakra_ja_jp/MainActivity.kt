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

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d("MainActivity", "onCreate")
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
        Log.d("MainActivity", "onStart")
        super.onStart()
    }

    override fun onResume() {
        Log.d("MainActivity", "onResume")
        super.onResume()
        webView.onResume()
        if (theText != "") {
            speechText(theText)
        }
    }

    override fun onPause() {
        Log.d("MainActivity", "onPause")
        super.onPause()
        webView.onPause()
        stopSpeech()
    }

    override fun onStop() {
        Log.d("MainActivity", "onStop")
        super.onStop()
        webView.onPause()
        stopSpeech()
    }

    override fun onDestroy() {
        Log.d("MainActivity", "onDestroy")
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
                    Log.e("MainActivity", "!PERMISSION_GRANTED")
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
        var success: Boolean = true
        var failed: Boolean = false
        webView.post {
            webView.webViewClient = MyWebViewClient(object: MyWebViewClient.Listener {
                override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                             error: WebResourceError?)
                {
                    Log.d("WebViewClient", "onReceivedError")
                    success = false
                }

                override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                                 errorResponse: WebResourceResponse?)
                {
                    Log.d("WebViewClient", "onReceivedHttpError")
                    success = false
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    Log.d("WebViewClient", "onPageFinished")
                    findViewById<TextView>(R.id.loading).visibility = View.GONE
                    if (!success && !failed) {
                        failed = true
                        webView.loadUrl(getString(R.string.failed_url))
                    }
                }
            })

            val chromeClient = MyWebChromeClient(this, object: MyWebChromeClient.Listener {
                override fun onSpeech(text: String) {
                    Log.d("WebChromeClient", "onSpeech")
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
        var locale = Locale.JAPANESE
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

    fun stopSpeech() {
        if (isSpeechReady) {
            val params = Bundle()
            tts.speak("", TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    class WebViewThread(activity: MainActivity) : Thread() {
        private var mainActivity: MainActivity = activity

        override fun run() {
            mainActivity.initWebView()
        }
    }

    class TtsThread(activity: MainActivity) : Thread() {
        private var mainActivity: MainActivity = activity

        override fun run() {
            mainActivity.initTextToSpeech()
        }
    }
}