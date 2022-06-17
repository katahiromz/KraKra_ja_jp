package com.katahiromz.krakra_ja_jp

import android.annotation.SuppressLint
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.webkit.ValueCallback
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import java.util.*

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {

    companion object {
        const val url: String = "https://katahiromz.github.io/saimin/"
        const val requestCodePermissionAudio: Int = 1
    }

    private lateinit var webView: WebView
    private lateinit var tts: TextToSpeech
    private lateinit var thread: MyThread

    private var resultString: String = ""
    private var loaded: Boolean = false
    private var speechReady: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        tts = TextToSpeech(this, this)
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

    // for TextToSpeech
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            speechReady = true
            var locale = Locale.JAPANESE
            if (BuildConfig.DEBUG)
                locale = Locale.ENGLISH
            if (tts.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts.language = locale
            }
        }
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        if (!loaded) {
            loaded = true
            showPopup()
            thread = MyThread(this)
            thread.start()
        }
    }

    // ValueCallback<String>
    override fun onReceiveValue(value: String) {
        resultString = value
    }

    @SuppressLint("SetJavaScriptEnabled")
    fun init() {
        // get version info
        val appName: String = this.packageName
        val pm: PackageManager = this.packageManager
        val pi: PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        val versionName: String = pi.versionName

        webView = findViewById(R.id.webview)

        webView.post {
            // modify web settings
            val settings = webView.settings
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.mediaPlaybackRequiresUserGesture = false
            if (BuildConfig.DEBUG) {
                WebView.setWebContentsDebuggingEnabled(true)
            }

            // modify user-agent string
            var userAgentString: String? = settings.userAgentString
            if (userAgentString != null) {
                userAgentString += "/KraKra-native-app/$versionName/"
                settings.userAgentString = userAgentString
            }
        }

        webView.post {
            webView.webViewClient = MyWebViewClient(this)
            webView.webChromeClient = MyWebChromeClient(this)
            webView.loadUrl(url)
        }
    }

    fun speechText(text: String) {
        if (speechReady) {
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

    class MyThread(activity: MainActivity) : Thread() {
        private var mainActivity: MainActivity = activity

        override fun run() {
            mainActivity.init()
        }
    }
}