// KraKraのクロームクライアント。
// Copyright (c) 2023 Katayama Hirofumi MZ. All Rights Reserved.

package com.katahiromz.krakra_ja_jp

import android.text.InputType
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.widget.EditText
import androidx.appcompat.app.AlertDialog
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import timber.log.Timber
import java.util.Locale

class MyWebChromeClient(private var activity: MainActivity?, private val listener: Listener) :
    WebChromeClient() {

    // リスナ。
    interface Listener {
        fun onSpeech(text: String)
        fun onShowToast(text: String, typeOfToast: Int)
        fun onShowSnackbar(text: String, typeOfSnack: Int)
        fun onProgressChanged(view: WebView?, newProgress: Int)
        fun onBrightness(value: String)
    }

    // ローカライズされた文字列を取得する。
    // 複数の翻訳版に対応するため、特別に処理を用意した。
    private fun getLocString(resId: Int): String {
        return activity!!.getLocString(resId)
    }

    override fun onProgressChanged(view: WebView?, newProgress: Int) {
        listener.onProgressChanged(view, newProgress)
    }

    /////////////////////////////////////////////////////////////////////
    // パーミッション関連。
    override fun onPermissionRequest(request: PermissionRequest) {
        for (res in request.resources) {
            if (res == PermissionRequest.RESOURCE_AUDIO_CAPTURE) {
                request.grant(request.resources)
                return
            }
        }
        super.onPermissionRequest(request)
    }

    /////////////////////////////////////////////////////////////////////
    // JavaScript interface-related
    // これらの関数はJavaScriptからアクセスできる。

    // 画面の明るさを調整する。
    @JavascriptInterface
    fun setBrightness(brightness: String) {
        listener.onBrightness(brightness)
    }

    // NaviBarを表示する。
    @JavascriptInterface
    fun showNaviBar(show: Boolean) {
        activity!!.showNaviBar(show)
    }

    // スピーチをキャンセルする。
    @JavascriptInterface
    fun cancelSpeech() {
        listener.onSpeech("")
    }

    // スピーチをループする。実は32回まで。
    @JavascriptInterface
    fun speechLoop(msg: String) {
        listener.onSpeech(msg.repeat(32))
    }

    // KraKraの設定をクリアする。
    @JavascriptInterface
    fun clearSettings() {
        MainRepository.clearMessageList(activity!!)
    }

    // 現在の映像の種類を表す整数値。
    private var currPicType: Int = 0

    // 現在の映像の種類をセットする。
    @JavascriptInterface
    fun setPicType(picType: Int) {
        currPicType = picType
    }

    // 現在の言語をセットする。
    @JavascriptInterface
    fun setLanguage(lang: String) {
        // {{LANGUAGE_SPECIFIC}}
        val locale : Locale
        when (lang) {
            "ja", "jp", "ja-JP" -> { // Japanese
                locale = Locale.JAPANESE
            }
            "zh-CN" -> { // Chinese (Simplified)
                locale = Locale.SIMPLIFIED_CHINESE
            }
            "zh-TW" -> { // Chinese (Traditional)
                locale = Locale.TRADITIONAL_CHINESE
            }
            "ko-KR" -> { // Korean
                locale = Locale.KOREAN
            }
            "it", "it-IT" -> { // Italian
                locale = Locale.ITALIAN
            }
            "de", "de-DE" -> { // German
                locale = Locale.GERMAN
            }
            else -> { // English is default
                locale = Locale.ENGLISH
            }
        }
        Locale.setDefault(locale)
        activity!!.setCurLocale(locale)
    }

    private var modalDialog: AlertDialog? = null

    // JavaScriptのalert関数をフックする。
    override fun onJsAlert(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        // MaterialAlertDialogを使用して普通に実装する。
        val title = getLocString(R.string.app_name)
        val okText = getLocString(R.string.ok)
        modalDialog = MaterialAlertDialogBuilder(activity!!, R.style.AlertDialogTheme)
            .setTitle(title)
            .setMessage(message)
            .setPositiveButton(okText) { _, _ ->
                result?.confirm()
                modalDialog = null
            }
            .setCancelable(false)
            .create()
        modalDialog?.show()
        return true
    }

    // JavaScriptのconfirm関数をフックする。
    override fun onJsConfirm(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        // MaterialAlertDialogを使用して普通に実装する。
        val title = getLocString(R.string.app_name)
        val okText = getLocString(R.string.ok)
        val cancelText = getLocString(R.string.cancel)
        modalDialog = MaterialAlertDialogBuilder(activity!!, R.style.AlertDialogTheme)
            .setTitle(title)
            .setMessage(message)
            .setPositiveButton(okText) { _, _ ->
                result?.confirm()
                modalDialog = null
            }
            .setNegativeButton(cancelText) { _, _ ->
                result?.cancel()
                modalDialog = null
            }
            .setCancelable(false)
            .create()
        modalDialog?.show()
        return true
    }

    // JavaScriptのprompt関数をフックする。
    override fun onJsPrompt(
        view: WebView?,
        url: String?,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ): Boolean {
        activity!!.currLocaleContext = null
        val title = getLocString(R.string.app_name)

        // KraKraでは特定のメッセージに対してダイアログを拡張する。
        if (isSelectMessageDialog(message)) {
            // メッセージ選択ダイアログを表示
            showSelectMessageDialog(
                title = title,
                message = message,
                defaultValue = defaultValue,
                result = result
            )
            return true
        }

        // さもなければMaterialAlertDialogを使用して普通に実装する。
        val okText = getLocString(R.string.ok)
        val cancelText = getLocString(R.string.cancel)
        val input = EditText(activity!!)
        input.inputType = InputType.TYPE_CLASS_TEXT
        input.setText(if (defaultValue != null) defaultValue else "")
        modalDialog = MaterialAlertDialogBuilder(activity!!, R.style.AlertDialogTheme)
            .setTitle(title)
            .setMessage(message)
            .setView(input)
            .setPositiveButton(okText) { _, _ ->
                result?.confirm(input.text.toString())
                modalDialog = null
            }
            .setNegativeButton(cancelText) { _, _ ->
                result?.cancel()
                modalDialog = null
            }
            .setCancelable(false)
            .create()
        modalDialog?.show()
        return true
    }

    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        if (BuildConfig.DEBUG) {
            if (consoleMessage != null) {
                val msg = consoleMessage.message()
                val line = consoleMessage.lineNumber()
                val src = consoleMessage.sourceId()
                Timber.d("console: $msg at Line $line of $src")
            }
        }
        return super.onConsoleMessage(consoleMessage)
    }

    /////////////////////////////////////////////////////////////////////
    // extension of JavaScript prompt function

    /// KraKraのメッセージ選択ダイアログの表示対象か判定する
    /// @param message メッセージ文字列
    /// @return true: メッセージ選択ダイアログの表示対象、false: それ以外
    private fun isSelectMessageDialog(message: String?): Boolean {
        val msg: String = getLocString(R.string.message_select_dialog_message)
        if (msg == message)
            return true
        // {{LANGUAGE_SPECIFIC}}
        // リソースと現在のロケールの同期ができないので、文字列を埋め込むことにした。
        return (message == "Please enter a message text." ||
                message == "メッセージ文字列を入力して下さい。" ||
                message == "请输入消息文本。" ||
                message == "請輸入消息字符串。" ||
                message == "메시지 문자열을 입력하십시오." ||
                message == "Inserisci il testo del messaggio." ||
                message == "Bitte geben Sie einen Nachrichtentext ein.")
    }

    /// KraKraのメッセージ選択ダイアログの表示。
    private fun showSelectMessageDialog(title: String, message: String?, defaultValue: String?,
                                        result: JsPromptResult?) {
        val messageListDialog = MessageListDialog(activity!!, defaultValue, result)
        messageListDialog.show(activity!!.supportFragmentManager, "MessageListDialog")
    }
}
