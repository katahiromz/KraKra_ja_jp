package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.util.Log
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.input.input

class MyWebChromeClient(private val activity: AppCompatActivity, private val listener: Listener) :
    WebChromeClient() {

    interface Listener {
        fun onSpeech(text: String)
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
        val title = activity.getString(R.string.app_name)
        MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            positiveButton(text = "OK") { }
        }
        return true
    }

    override fun onJsConfirm(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        val title = activity.getString(R.string.app_name)
        MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            positiveButton(text = "OK") {
                result?.confirm()
            }
            negativeButton(text = "Cancel") {
                result?.cancel()
            }
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
        val title = activity.getString(R.string.app_name)
        var inputtedText: String? = null
        MaterialDialog(activity).show {
            title(text = title)
            message(text = message)
            input(hint = activity.getString(R.string.prompt_hint)) { _, text ->
                inputtedText = text.toString()
            }
            positiveButton(text = "OK") {
                result?.confirm(inputtedText ?: "")
            }
            negativeButton(text = "Cancel") {
                result?.cancel()
            }
        }
        return true
    }

    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        if (consoleMessage != null) {
            val msg = consoleMessage.message()
            if (BuildConfig.DEBUG) {
                val line = consoleMessage.lineNumber()
                val src = consoleMessage.sourceId()
                Log.d("console", "$msg at Line $line of $src")
            }
            if (msg[0] == '{') {
                if (msg == "{{cancelSpeech}}") {
                    listener.onSpeech("")
                } else {
                    val regex1 = Regex("""\{\{speechLoop::(.*)}}""")
                    val results = regex1.matchEntire(msg)
                    if (results != null) {
                        listener.onSpeech(results.groupValues[1].repeat(256))
                    }
                }
            }
        }
        return super.onConsoleMessage(consoleMessage)
    }
}
