// KraKraのウェブビュー クライアント。
// Copyright (c) 2023 Katayama Hirofumi MZ. All Rights Reserved.

package com.katahiromz.krakra_ja_jp

import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient

class MyWebViewClient(private val listener: Listener) : WebViewClient() {
    // リスナー。
    interface Listener {
        fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?)
        fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                errorResponse: WebResourceResponse?)
        fun onPageFinished(view: WebView?, url: String?)
    }

    // 読み込み可能なURLを制限したり、フックする。
    override fun shouldOverrideUrlLoading(
        view: WebView?,
        request: WebResourceRequest?
    ): Boolean {
        if (view != null && request != null) {
            // アセット内部に制限する。
            val url: String = request.url.toString()
            val index:Int = url.indexOf("file:///android_asset/")
            if (index == 0) {
                view.loadUrl(url)
                return true
            }
        }
        return true
    }

    // ウェブビューからのエラーをリスナーに渡す。
    override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                 error: WebResourceError?)
    {
        super.onReceivedError(view, request, error)
        listener.onReceivedError(view, request, error)
    }

    // ウェブビューからのエラーをリスナーに渡す。
    override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                     errorResponse: WebResourceResponse?)
    {
        super.onReceivedHttpError(view, request, errorResponse)
        listener.onReceivedHttpError(view, request, errorResponse)
    }

    // ウェブビューからのエラーをリスナーに渡す。
    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        listener.onPageFinished(view, url)
    }
}