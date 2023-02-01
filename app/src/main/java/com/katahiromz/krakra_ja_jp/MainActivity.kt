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
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import java.util.*
import timber.log.Timber

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {
    /////////////////////////////////////////////////////////////////////
    // 共通

    // デバッグログにTimberを使用する。
    fun initTimber() {
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }


    companion object {
        const val requestCodePermissionAudio = 1
    }

    private var webView: WebView? = null
    private var chromeClient: MyWebChromeClient? = null
    private var webViewThread: WebViewThread? = null

    private var resultString = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.i("onCreate")
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        if (false) {
            initWebView()
            initTextToSpeech()
        } else {
            webViewThread = WebViewThread(this)
            webViewThread?.start()
            ttsThread = TtsThread(this)
            ttsThread?.start()
        }

        // Initialize Timber
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

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray)
    {
        if (requestCode == requestCodePermissionAudio) {
            if (grantResults.isNotEmpty()) {
                if (grantResults[0] != PackageManager.PERMISSION_GRANTED) {
                    Timber.i("Not PERMISSION_GRANTED!")
                } else {
                    val myRequest = chromeClient?.myRequest
                    if (myRequest != null) {
                        myRequest.grant(myRequest.resources)
                    }
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
                override fun onSpeech(text: String) {
                    Timber.i("onSpeech")
                    theText = text
                    speechText(text)
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
        settings?.javaScriptEnabled = true
        settings?.domStorageEnabled = true
        settings?.mediaPlaybackRequiresUserGesture = false
        if (BuildConfig.DEBUG) {
            settings?.cacheMode = WebSettings.LOAD_NO_CACHE
            WebView.setWebContentsDebuggingEnabled(true)
        }
        if (settings != null) {
            val versionName = getVersionName()
            settings.userAgentString += "/KraKra-native-app/$versionName/"
        }
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
        if (tts != null) {
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            }
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