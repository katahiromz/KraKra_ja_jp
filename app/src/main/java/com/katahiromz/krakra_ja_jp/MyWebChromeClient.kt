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

    public var myRequest: PermissionRequest? = null

    override fun onPermissionRequest(request: PermissionRequest?) {
        if (request == null)
            return
        myRequest = request
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

    private var dialog: MaterialDialog? = null

    fun onResume() {
        if (dialog != null)
            dialog?.show()
    }

    override fun onJsAlert(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        val title = getResString(R.string.app_name)
        dialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            positiveButton(text = getResString(R.string.ok)) {
                dialog = null
            }
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
        dialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            positiveButton(text = getResString(R.string.ok)) {
                result?.confirm()
                dialog = null
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
                dialog = null
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
            // ?????????????????????????????????????????????
            showSelectMessageDialog(
                title = title,
                message = message,
                defaultValue = defaultValue,
                result = result
            )
            return true
        }
        var inputtedText: String? = null
        dialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            input(hint = getResString(R.string.prompt_hint), prefill = defaultValue) { _, text ->
                inputtedText = text.toString()
            }
            positiveButton(text = getResString(R.string.ok)) {
                result?.confirm(inputtedText ?: "")
                dialog = null
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
                dialog = null
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }
        return true
    }

    /**
     * ??????????????????????????????????????????????????????????????????
     * @param message ????????????????????????
     * @return true: ??????????????????????????????????????????????????????false: ????????????
     */
    private fun isSelectMessageDialog(message: String?): Boolean =
        message == getResString(R.string.message_select_dialog_message)

    private fun showSelectMessageDialog(
        title: String,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ) {
        dialog = MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            customView(R.layout.message_select_dialog, scrollable = true, horizontalPadding = true)
            positiveButton(text = getResString(R.string.ok)) {
                val editText = getCustomView().findViewById<EditText>(R.id.message_edit)
                val inputtedText = editText.text.toString()
                result?.confirm(inputtedText)
                dialog = null

                val defaultMessageList = activity.getStringArray(R.array.message_sample_list)
                MainRepository.getMessageList(activity).apply {
                    val messageList = defaultMessageList + this
                    if (!messageList.contains(inputtedText)) {
                        MainRepository.setMessageList(activity, this + inputtedText)
                    }
                }
            }
            negativeButton(text = getResString(R.string.cancel)) {
                result?.cancel()
                dialog = null
            }
            cancelable(false)
            cancelOnTouchOutside(false)
            lifecycleOwner(activity)
        }

        // ??????????????????????????????????????????
        val customView = dialog!!.getCustomView()
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

        // ????????????????????????????????????????????????????????????
        val listItemHeightCount = 5
        for (i in 0 until arrayAdapter.count) {
            val listItem = arrayAdapter.getView(i, null, listView)
            listItem.measure(0, 0)
            totalHeight += listItem.measuredHeight
            if (i == listItemHeightCount - 1) {
                break
            }
        }

        // (????????????????????? * ???????????????)??????????????????
        return if (arrayAdapter.count < listItemHeightCount) {
            totalHeight + (listView.dividerHeight * (arrayAdapter.count - 1))
        } else {
            totalHeight + (listView.dividerHeight * listItemHeightCount)
        }
    }

    @JavascriptInterface
    fun cancelSpeech() {
        listener.onSpeech("")
    }

    @JavascriptInterface
    fun speechLoop(msg: String) {
        listener.onSpeech(msg.repeat(64))
    }

    @JavascriptInterface
    fun clearSettings() {
        MainRepository.clearMessageList(activity)
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
