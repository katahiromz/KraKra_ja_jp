package com.katahiromz.krakra_ja_jp

import android.app.Activity
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen

class MainActivity : AppCompatActivity() {
    var webView : WebView? = null
    var loaded : Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        supportActionBar?.hide()

        // get version info
        var appName : String = this.packageName
        var pm : PackageManager = this.packageManager
        var pi : PackageInfo = pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        var versionName : String = pi.versionName

        webView = findViewById(R.id.webview)

        // modify web settings
        var settings = webView?.settings
        settings?.javaScriptEnabled = true
        settings?.domStorageEnabled = true
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true)
        }

        // modify user-agent string
        var userAgentString : String? = settings?.userAgentString
        if (userAgentString != null) {
            userAgentString += "/KraKra-native-app/" + versionName + "/"
            settings?.userAgentString = userAgentString
        }

        webView?.webViewClient = MyWebViewClient(this)

        webView?.loadUrl("https://katahiromz.github.io/saimin/")
    }

    class MyWebViewClient(activity: MainActivity) : WebViewClient() {
        var mainActivity : MainActivity = activity
        
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            return false
        }

        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            mainActivity.loaded = true
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

    fun executeJavascript(script: String) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            webView?.evaluateJavascript(script, null)
        } else {
            webView?.loadUrl("javascript:" + script)
        }
    }
}