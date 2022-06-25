package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.util.Log
import android.webkit.*
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.customview.customView
import com.afollestad.materialdialogs.customview.getCustomView
import com.afollestad.materialdialogs.input.input
import com.afollestad.materialdialogs.lifecycle.lifecycleOwner
import com.afollestad.materialdialogs.utils.MDUtil.getStringArray

class MyWebChromeClient(private val activity: AppCompatActivity, private val listener: Listener) :
    WebChromeClient() {

    interface Listener {
        fun onSpeech(text: String)
    }

    private fun getResString(resId: Int): String {
        return activity.getString(resId)
    }

    override fun onPermissionRequest(request: PermissionRequest?) {
        if (request == null)
            return
        val permissionCheck =
            ContextCompat.checkSelfPermission(activity, Manifest.permission.RECORD_AUDIO)
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                activity, arrayOf(Manifest.permission.RECORD_AUDIO),
                MainActivity.requestCodePermissionAudio
            )
        } else {
            request.grant(request.resources)
        }
    }

    override fun onJsAlert(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        val title = getResString(R.string.app_name)
        MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            positiveButton(text = getResString(R.string.ok)) { }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }
        result?.confirm()
        return true
    }

    override fun onJsConfirm(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        val title = getResString(R.string.app_name)
        MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            positiveButton(text = getResString(R.string.ok)) {
                result?.confirm()
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }
        return true
    }

    @SuppressLint("CheckResult")
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
            showSelectMessageDialog(title = title, message = message, defaultValue = defaultValue, result = result)
            return true
        }
        var inputtedText: String? = null
        MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            input(hint = getResString(R.string.prompt_hint), prefill = defaultValue) { _, text ->
                inputtedText = text.toString()
            }
            positiveButton(text = getResString(R.string.ok)) {
                result?.confirm(inputtedText ?: "")
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }
        return true
    }

    /**
     * メッセージ選択ダイアログの表示対象か判定する
     * @param message メッセージ文字列
     * @return true: メッセージ選択ダイアログの表示対象、false: それ以外
     */
    private fun isSelectMessageDialog(message: String?): Boolean = message == getResString(R.string.message_select_dialog_message)

    private fun showSelectMessageDialog(
        title: String,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ) {
        val dialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            customView(R.layout.message_select_dialog, scrollable = true, horizontalPadding = true)
            positiveButton(text = getResString(R.string.ok)) {
                val editText = getCustomView().findViewById<EditText>(R.id.message_edit)
                result?.confirm(editText.text.toString())
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }

        // ダイアログのレイアウトを設定
        val customView = dialog.getCustomView()
        val listView: ListView = customView.findViewById(R.id.message_list)
        val messageList = activity.getStringArray(R.array.message_sample_list)
        val arrayAdapter = ArrayAdapter(activity, android.R.layout.simple_list_item_1, messageList)
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
        for (i in 0 until arrayAdapter.count) {
            val listItem = arrayAdapter.getView(i, null, listView)
            listItem.measure(0, 0)
            totalHeight += listItem.measuredHeight
        }

        // (区切り線の高さ * 要素数の数)を高さとする
        val listItemMaxCount = 4
        return if (arrayAdapter.count <= listItemMaxCount) {
            totalHeight + (listView.dividerHeight * (arrayAdapter.count - 1))
        } else {
            totalHeight + (listView.dividerHeight * listItemMaxCount)
        }
    }

    @JavascriptInterface
    fun cancelSpeech() {
        listener.onSpeech("")
    }

    @JavascriptInterface
    fun speechLoop(msg: String) {
        listener.onSpeech(msg.repeat(256))
    }

    @JavascriptInterface
    fun clearSettings() {
        // TODO:
    }

    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        if (consoleMessage != null) {
            val msg = consoleMessage.message()
            if (BuildConfig.DEBUG) {
                val line = consoleMessage.lineNumber()
                val src = consoleMessage.sourceId()
                Log.d("console", "$msg at Line $line of $src")
            }
        }
        return super.onConsoleMessage(consoleMessage)
    }
}
