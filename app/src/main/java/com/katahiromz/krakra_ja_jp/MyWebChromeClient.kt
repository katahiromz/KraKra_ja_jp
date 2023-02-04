package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.content.pm.PackageManager
import android.webkit.*
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat.*
import androidx.core.content.ContextCompat
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.customview.customView
import com.afollestad.materialdialogs.customview.getCustomView
import com.afollestad.materialdialogs.input.input
import com.afollestad.materialdialogs.lifecycle.lifecycleOwner
import com.afollestad.materialdialogs.utils.MDUtil.getStringArray
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import timber.log.Timber

// 定数。
const val MY_WEBVIEW_REQUEST_CODE_01 = 999

class MyWebChromeClient(private val activity: AppCompatActivity, private val listener: Listener) :
    WebChromeClient() {

    // リスナ。
    interface Listener {
        fun onChromePermissionRequest(permissions: Array<String>, requestCode: Int)
        fun onSpeech(text: String)
        fun onShowToast(text: String, typeOfToast: Int)
        fun onShowSnackbar(text: String, typeOfSnack: Int)
        fun onProgressChanged(view: WebView?, newProgress: Int)
    }

    private fun getResString(resId: Int): String {
        return activity.getString(resId)
    }

    override fun onProgressChanged(view: WebView?, newProgress: Int) {
        listener.onProgressChanged(view, newProgress)
    }

    /////////////////////////////////////////////////////////////////////
    // パーミッション関連

    override fun onPermissionRequest(request: PermissionRequest?) {
        // Audio record request
        val audioCheck =
                ContextCompat.checkSelfPermission(activity, Manifest.permission.RECORD_AUDIO)
        when (audioCheck) {
            PackageManager.PERMISSION_GRANTED -> {
                request?.grant(request.resources)
            }
            PackageManager.PERMISSION_DENIED -> {
                val audioRational =
                        shouldShowRequestPermissionRationale(
                                activity, Manifest.permission.RECORD_AUDIO)
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
        MainRepository.clearMessageList(activity)
    }

    // JavaScriptのalert関数をラップする。
    override fun onJsAlert(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        // MaterialAlertDialogを使用して実装する。
        val title = getResString(R.string.app_name)
        val ok_text = getResString(R.string.ok)
        MaterialAlertDialogBuilder(activity)
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
        // MaterialAlertDialogを使用して実装する。
        val title = getResString(R.string.app_name)
        val ok_text = getResString(R.string.ok)
        val cancel_text = getResString(R.string.cancel)
        MaterialAlertDialogBuilder(activity)
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
        val title = getResString(R.string.app_name)
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
        var inputtedText: String? = null
        modalDialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            input(hint = getResString(R.string.prompt_hint), prefill = defaultValue) { _, text ->
                inputtedText = text.toString()
            }
            positiveButton(text = getResString(R.string.ok)) {
                result?.confirm(inputtedText ?: "")
                modalDialog = null
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
                modalDialog = null
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }
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
    private fun isSelectMessageDialog(message: String?): Boolean =
        message == getResString(R.string.message_select_dialog_message)

    private fun showSelectMessageDialog(
        title: String,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ) {
        modalDialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            customView(R.layout.message_select_dialog, scrollable = true, horizontalPadding = true)
            positiveButton(text = getResString(R.string.ok)) {
                val editText = getCustomView().findViewById<EditText>(R.id.message_edit)
                val inputtedText = editText.text.toString()
                result?.confirm(inputtedText)
                modalDialog = null

                val defaultMessageList = activity.getStringArray(R.array.message_sample_list)
                MainRepository.getMessageList(activity).apply {
                    val messageList = defaultMessageList + this
                    if (inputtedText.isNotEmpty() && !messageList.contains(inputtedText)) {
                        MainRepository.setMessageList(activity, this + inputtedText)
                    }
                }
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
                modalDialog = null
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }

        // ダイアログのレイアウトを設定
        val customView = modalDialog!!.getCustomView()
        val listView: ListView = customView.findViewById(R.id.message_list)
        val defaultMessageList = activity.getStringArray(R.array.message_sample_list)
        val inputtedMessageList = MainRepository.getMessageList(activity)
        val arrayAdapter = ArrayAdapter(
            activity,
            android.R.layout.simple_list_item_1,
            defaultMessageList + inputtedMessageList
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

        val clearButton = customView.findViewById<Button>(R.id.clear_button)
        val editText: EditText = customView.findViewById(R.id.message_edit)
        editText.setText(defaultValue)
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
