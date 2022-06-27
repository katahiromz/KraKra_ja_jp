package com.katahiromz.krakra_ja_jp

import android.annotation.TargetApi
import android.webkit.*

class MyWebViewClient(val listener: Listener) : WebViewClient() {
    interface Listener {
        fun onReceivedError(view: WebView?, errorCode: Int, description: String?,
                            failingUrl: String?)
        fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                errorResponse: WebResourceResponse?)
        fun onPageFinished(view: WebView?, url: String?)
    }

    override fun shouldOverrideUrlLoading(
        view: WebView?,
        request: WebResourceRequest?
    ): Boolean {
        return false
    }

    @Suppress("DEPRECATION")
    override fun onReceivedError(view: WebView?, errorCode: Int, description: String?, failingUrl: String?) {
        //super.onReceivedError(view, errorCode, description, failingUrl) // No use!
        listener.onReceivedError(view, errorCode, description, failingUrl)
    }

    @TargetApi(android.os.Build.VERSION_CODES.M)
    override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                 error: WebResourceError?)
    {
        // Redirect to deprecated method, so you can use it in all SDK versions
        this.onReceivedError(view, error!!.errorCode, error.description.toString(), 
                             request!!.url.toString())
    }

    override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                     errorResponse: WebResourceResponse?)
    {
        //super.onReceivedHttpError(view, request, errorResponse) // No use!
        listener.onReceivedHttpError(view, request, errorResponse)
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        listener.onPageFinished(view, url)
    }
}