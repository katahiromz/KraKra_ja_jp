package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.util.Log
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.app.ActivityCompat.*
import androidx.core.content.ContextCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import java.util.*

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {
    var webView : WebView? = null
    var loaded : Boolean = false
    var thread : MyThread? = null
    var resultString : String = ""
    var tts : TextToSpeech? = null
    var speechReady : Boolean = false
    val url : String = "https://katahiromz.github.io/saimin/"
    val REQUEST_CODE_PERMISSION_AUDIO : Int = 1

    fun init() {
        Log.d("MainActivity", "init")
        // get version info
        val appName : String = this.packageName
        var pm : PackageManager = this.packageManager
        var pi : PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        val versionName : String = pi.versionName

        webView = findViewById(R.id.webview)

        webView?.post {
            // modify web settings
            var settings = webView?.settings
            settings?.javaScriptEnabled = true
            settings?.domStorageEnabled = true
            settings?.mediaPlaybackRequiresUserGesture = false
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
            var params = Bundle()
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

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        if (requestCode == REQUEST_CODE_PERMISSION_AUDIO) {
            if (grantResults.size > 0) {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    webView?.reload()
                }
            }
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

        override fun onPermissionRequest(request: PermissionRequest?) {
            if (request == null)
                return
            Log.d("WebChromeClient", "onPermissionRequest")
            val permissionCheck = checkSelfPermission(mainActivity, Manifest.permission.RECORD_AUDIO)
            if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(mainActivity, arrayOf(Manifest.permission.RECORD_AUDIO),
                                   mainActivity.REQUEST_CODE_PERMISSION_AUDIO)
            } else {
                request.grant(request.resources)
            }
        }

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
            if (consoleMessage != null) {
                val msg : String = consoleMessage.message().toString()
                if (BuildConfig.DEBUG) {
                    val line = consoleMessage.lineNumber().toString()
                    val  src = consoleMessage.sourceId().toString()
                    Log.d("console", "$msg at Line $line of $src")
                }
                if (msg.get(0) == '{') {
                    if (msg == "{{cancelSpeech}}") {
                        mainActivity.speechText("")
                    } else {
                        val regex1 : Regex = Regex("""\{\{speechLoop::(.*)\}\}""")
                        var results = regex1.matchEntire(msg)
                        if (results != null) {
                            mainActivity.speechText(results.groupValues[1].repeat(256))
                        }
                    }
                }
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