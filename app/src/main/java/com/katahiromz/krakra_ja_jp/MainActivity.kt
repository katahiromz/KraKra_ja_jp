package com.katahiromz.krakra_ja_jp

import android.annotation.SuppressLint
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.webkit.ValueCallback
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import java.util.*

class MainActivity : AppCompatActivity(), ValueCallback<String> {

    companion object {
        const val url = "https://katahiromz.github.io/saimin/"
        const val requestCodePermissionAudio = 1
    }

    private lateinit var webView: WebView
    private lateinit var tts: TextToSpeech
    private lateinit var thread: WebViewThread

    private var resultString = ""
    private var isLoaded = false
    private var isSpeechReady = false

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        tts = TextToSpeech(this) { status ->
            initTextToSpeech(status)
        }
        webView = findViewById(R.id.web_view)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        if (requestCode == requestCodePermissionAudio) {
            if (grantResults.isNotEmpty()) {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    webView.reload()
                }
            }
        }
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        if (!isLoaded) {
            isLoaded = true
            showPopup()
            thread = WebViewThread(this)
            thread.start()
        }
    }

    // ValueCallback<String>
    override fun onReceiveValue(value: String) {
        resultString = value
    }

    fun initWebView() {
        webView.post {
            initWebSettings()
        }
        webView.post {
            webView.webViewClient = MyWebViewClient(this)
            webView.webChromeClient = MyWebChromeClient(this, object: MyWebChromeClient.Listener{
                override fun onSpeech(text: String) {
                    speechText(text)
                }
            })
            webView.loadUrl(url)
        }
    }

    private fun initTextToSpeech(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isSpeechReady = true
            var locale = Locale.JAPANESE
            if (BuildConfig.DEBUG)
                locale = Locale.ENGLISH
            if (tts.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts.language = locale
            }
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

    private fun showPopup() {
        // TODO:
    }

    class WebViewThread(activity: MainActivity) : Thread() {
        private var mainActivity: MainActivity = activity

        override fun run() {
            mainActivity.initWebView()
        }
    }
}