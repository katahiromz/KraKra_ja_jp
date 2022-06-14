package com.katahiromz.krakra_ja_jp

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.content.pm.PackageManager;

class MainActivity : AppCompatActivity() {
    var webView : WebView? = null
    var loaded : Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
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
            return true
        }

        override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
            handler?.proceed()
        }

        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            if (!mainActivity.loaded) {
                mainActivity.loaded = true
                mainActivity.setTheme(R.style.Theme_KraKra_ja_jp)
            }
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