package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.content.res.Resources
import android.media.VolumeShaper
import android.text.InputType
import android.webkit.*
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.app.ActivityCompat.*
import androidx.core.content.ContextCompat
import androidx.core.os.LocaleListCompat
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.customview.customView
import com.afollestad.materialdialogs.customview.getCustomView
import com.afollestad.materialdialogs.input.input
import com.afollestad.materialdialogs.lifecycle.lifecycleOwner
import com.afollestad.materialdialogs.utils.MDUtil.getStringArray
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import timber.log.Timber
import java.util.*

// 定数。
const val MY_WEBVIEW_REQUEST_CODE_01 = 999

class MyWebChromeClient(public var activity: MainActivity?, private val listener: Listener) :
    WebChromeClient() {

    // リスナ。
    interface Listener {
        fun onChromePermissionRequest(permissions: Array<String>, requestCode: Int)
        fun onSpeech(text: String)
        fun onShowToast(text: String, typeOfToast: Int)
        fun onShowSnackbar(text: String, typeOfSnack: Int)
        fun onProgressChanged(view: WebView?, newProgress: Int)
        fun onBrightness(value: String)
    }

    private fun getLocString(resId: Int): String {
        return activity!!.getLocString(resId)
    }

    override fun onProgressChanged(view: WebView?, newProgress: Int) {
        listener.onProgressChanged(view, newProgress)
    }

    /////////////////////////////////////////////////////////////////////
    // パーミッション関連

    override fun onPermissionRequest(request: PermissionRequest?) {
        // Audio record request
        val audioCheck =
                ContextCompat.checkSelfPermission(activity!!, Manifest.permission.RECORD_AUDIO)
        when (audioCheck) {
            PackageManager.PERMISSION_GRANTED -> {
                request?.grant(request.resources)
            }
            PackageManager.PERMISSION_DENIED -> {
                val audioRational =
                        shouldShowRequestPermissionRationale(
                                activity!!, Manifest.permission.RECORD_AUDIO)
                if (audioRational) {
                    listener.onChromePermissionRequest(
                            arrayOf(Manifest.permission.RECORD_AUDIO),
                            MY_WEBVIEW_REQUEST_CODE_01)
                }
            }
            else -> {
                require(false, { "PermissionChecker" })
            }
        }
        // TODO: Add more request
    }

    /////////////////////////////////////////////////////////////////////
    // JavaScript interface-related

    // 画面の明るさを調整する。
    @JavascriptInterface
    fun setBrightness(brightness: String) {
        listener.onBrightness(brightness);
    }

    @JavascriptInterface
    fun showNaviBar(show: Boolean) {
        activity!!.showNaviBar(show);
    }

    @JavascriptInterface
    fun cancelSpeech() {
        listener.onSpeech("")
    }

    @JavascriptInterface
    fun speechLoop(msg: String) {
        listener.onSpeech(msg.repeat(32))
    }

    @JavascriptInterface
    fun clearSettings() {
        MainRepository.clearMessageList(activity!!)
    }

    var currPicType: Int = 0

    @JavascriptInterface
    fun setPicType(picType: Int) {
        currPicType = picType
    }

    @JavascriptInterface
    fun setLanguage(lang: String) {
        // {{LANGUAGE_SPECIFIC}}
        var locale : Locale = if (lang == "ja" || lang == "jp" || lang == "ja-JP") { // Japanese
            Locale.JAPANESE
        } else if (lang == "zh-CN") { // Chinese (Simplified)
            Locale.SIMPLIFIED_CHINESE
        } else if (lang == "zh-TW") { // Chinese (Traditional)
            Locale.TRADITIONAL_CHINESE
        } else if (lang == "ko-KR") { // Korean
            Locale.KOREAN
        } else if (lang == "it" || lang == "it-IT") { // Italian
            Locale.ITALIAN
        } else if (lang == "de" || lang == "de-DE") { // German
            Locale.GERMAN
        } else { // English is default
            Locale.ENGLISH
        }
        Locale.setDefault(locale)
        activity!!.setCurLocale(locale)
    }

    // JavaScriptのalert関数をラップする。
    override fun onJsAlert(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        // MaterialAlertDialogを使用して普通に実装する。
        var title = getLocString(R.string.app_name)
        var ok_text = getLocString(R.string.ok)
        MaterialAlertDialogBuilder(activity!!, R.style.AlertDialogTheme)
            .setTitle(title)
            .setMessage(message)
            .setPositiveButton(ok_text) { _, _ ->
                result?.confirm()
            }
            .setCancelable(false)
            .show()
        return true
    }

    // JavaScriptのconfirm関数をラップする。
    override fun onJsConfirm(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        // MaterialAlertDialogを使用して普通に実装する。
        var title = getLocString(R.string.app_name)
        var ok_text = getLocString(R.string.ok)
        var cancel_text = getLocString(R.string.cancel)
        MaterialAlertDialogBuilder(activity!!, R.style.AlertDialogTheme)
            .setTitle(title)
            .setMessage(message)
            .setPositiveButton(ok_text) { _, _ ->
                result?.confirm()
            }
            .setNegativeButton(cancel_text) { _, _ ->
                result?.cancel()
            }
            .setCancelable(false)
            .show()
        return true
    }

    // アプリ復帰時にモーダルダイアログを再表示する。
    private var modalDialog: MaterialDialog? = null
    fun onResume() {
        if (modalDialog != null)
            modalDialog?.show()
    }

    // JavaScriptのprompt関数をラップする。
    override fun onJsPrompt(
        view: WebView?,
        url: String?,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ): Boolean {
        activity!!.currLocaleContext = null
        val title = getLocString(R.string.app_name)
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
        // MaterialAlertDialogを使用して普通に実装する。
        var ok_text = getLocString(R.string.ok)
        var cancel_text = getLocString(R.string.cancel)
        var input: EditText = EditText(activity!!)
        input.inputType = InputType.TYPE_CLASS_TEXT
        input.setText(if (defaultValue != null) defaultValue else "")
        MaterialAlertDialogBuilder(activity!!, R.style.AlertDialogTheme)
                .setTitle(title)
                .setMessage(message)
                .setView(input)
                .setPositiveButton(ok_text) { _, _ ->
                    result?.confirm(input.text.toString())
                }
                .setNegativeButton(cancel_text) { _, _ ->
                    result?.cancel()
                }
                .setCancelable(false)
                .show()
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

    /**
     * メッセージ選択ダイアログの表示対象か判定する
     * @param message メッセージ文字列
     * @return true: メッセージ選択ダイアログの表示対象、false: それ以外
     */
    private fun isSelectMessageDialog(message: String?): Boolean {
        var msg: String = getLocString(R.string.message_select_dialog_message)
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

    private fun showSelectMessageDialog(
        title: String,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ) {
        var defaultMessageList: MutableList<String> = activity!!.getDefaultMessageList()
        var messageList: MutableList<String> = MainRepository.loadMessageList(activity!!)

        if (messageList.isEmpty())
            messageList.addAll(defaultMessageList)

        modalDialog = MaterialDialog(activity!!).show {
            title(text = title)
            message(text = message)
            customView(R.layout.message_select_dialog, scrollable = true, horizontalPadding = true)
            positiveButton(text = getLocString(R.string.ok)) {
                var editText = getCustomView().findViewById<EditText>(R.id.message_edit)
                var inputtedText = editText.text.toString()

                if (inputtedText.isNotEmpty()) {
                    var index = messageList.indexOf(inputtedText)
                    if (index != -1)
                        messageList.removeAt(index)
                    messageList.add(0, inputtedText)
                    MainRepository.saveMessageList(activity!!, messageList)
                }

                result?.confirm(inputtedText)
                modalDialog = null
            }
            negativeButton(text = getLocString(R.string.cancel)) {
                result?.cancel()
                modalDialog = null
            }
            neutralButton(text = getLocString(R.string.reset)) {
                messageList.clear()
                messageList.addAll(defaultMessageList)
                MainRepository.saveMessageList(activity!!, messageList)

                result?.confirm("")
                modalDialog = null
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }

        // ダイアログのレイアウトを設定
        val customView = modalDialog!!.getCustomView()
        val listView: ListView = customView.findViewById(R.id.message_list)
        var arrayAdapter = ArrayAdapter(
            activity!!,
            android.R.layout.simple_list_item_1,
            messageList
        )
        listView.adapter = arrayAdapter

        val params = listView.layoutParams
        params.height = getMessageListHeight(listView, arrayAdapter)
        listView.layoutParams = params
        listView.onItemClickListener =
            AdapterView.OnItemClickListener { _, view, _, _ ->
                val sampleMessage = (view as TextView).text.toString()
                val editText: EditText = customView.findViewById(R.id.message_edit)
                editText.setText(sampleMessage)
            }

        var clearButton = customView.findViewById<Button>(R.id.clear_button)
        clearButton.setText(getLocString(R.string.clear))

        var editText: EditText = customView.findViewById(R.id.message_edit)
        editText.setText(defaultValue)
        editText.hint = getLocString(R.string.prompt_hint)

        clearButton.setOnClickListener {
            editText.setText("")
        }
    }

    private fun getMessageListHeight(listView: ListView, arrayAdapter: ArrayAdapter<String>): Int {
        var totalHeight = 0

        // 個々のアイテムの高さを測り、加算していく
        val listItemHeightCount = 5
        for (i in 0 until arrayAdapter.count) {
            val listItem = arrayAdapter.getView(i, null, listView)
            listItem.measure(0, 0)
            totalHeight += listItem.measuredHeight
            if (i == listItemHeightCount - 1) {
                break
            }
        }

        // (区切り線の高さ * 要素数の数)を高さとする
        return if (arrayAdapter.count < listItemHeightCount) {
            totalHeight + (listView.dividerHeight * (arrayAdapter.count - 1))
        } else {
            totalHeight + (listView.dividerHeight * listItemHeightCount)
        }
    }
}
