package com.katahiromz.krakra_ja_jp

import android.annotation.SuppressLint
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.util.Log
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat.requestPermissions
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import java.util.*

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {

    companion object {
        const val url: String = "https://katahiromz.github.io/saimin/"
    }

    private var webView: WebView? = null
    private var loaded: Boolean = false
    private var thread: MyThread? = null
    private var resultString: String = ""
    private var tts: TextToSpeech? = null
    private var speechReady: Boolean = false
    private val requestCodePermissionAudio: Int = 1

    @SuppressLint("SetJavaScriptEnabled")
    fun init() {
        Log.d("MainActivity", "init")
        // get version info
        val appName: String = this.packageName
        val pm: PackageManager = this.packageManager
        val pi: PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        val versionName: String = pi.versionName

        webView = findViewById(R.id.webview)

        webView?.post {
            // modify web settings
            val settings = webView?.settings
            settings?.javaScriptEnabled = true
            settings?.domStorageEnabled = true
            settings?.mediaPlaybackRequiresUserGesture = false
            if (BuildConfig.DEBUG) {
                WebView.setWebContentsDebuggingEnabled(true)
            }

            // modify user-agent string
            var userAgentString: String? = settings?.userAgentString
            if (userAgentString != null) {
                userAgentString += "/KraKra-native-app/$versionName/"
                settings?.userAgentString = userAgentString
            }
        }

        webView?.post {
            webView?.webViewClient = MyWebViewClient(this)
            webView?.webChromeClient = MyWebChromeClient(this)
            webView?.loadUrl(url)
        }
    }

    fun checkPermission(permissions: Array<String?>?, request_code: Int) {
        requestPermissions(this, permissions!!, request_code)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d("MainActivity", "onCreate")
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        tts = TextToSpeech(this, this)
    }

    fun speechText(text: String) {
        if (speechReady && tts != null) {
            val params = Bundle()
            val volume = 0.5f
            val speed = 0.3f
            val pitch = 0.8f
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, volume)
            tts!!.setPitch(pitch)
            tts!!.setSpeechRate(speed)
            tts!!.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId")
        }
    }

    // for TextToSpeech
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            speechReady = true
            var locale = Locale.JAPANESE
            if (BuildConfig.DEBUG)
                locale = Locale.ENGLISH
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
        }
    }

    override fun onStart() {
        Log.d("MainActivity", "onStart")
        super.onStart()
    }

    private fun showPopup() {
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

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        if (requestCode == requestCodePermissionAudio) {
            if (grantResults.isNotEmpty()) {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    webView?.reload()
                }
            }
        }
    }

    class MyThread(activity: MainActivity) : Thread() {
        private var mainActivity: MainActivity = activity

        override fun run() {
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