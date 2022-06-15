package com.katahiromz.krakra_ja_jp

import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.webkit.*
import android.widget.PopupWindow
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen

class MainActivity : AppCompatActivity() {
    var webView : WebView? = null
    var loaded : Boolean = false
    var thread : MyThread? = null

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
            webView?.loadUrl("https://katahiromz.github.io/saimin/")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d("MainActivity", "onCreate")
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
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
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            webView?.evaluateJavascript(script, null)
        } else {
            webView?.loadUrl("javascript:" + script)
        }
    }
}