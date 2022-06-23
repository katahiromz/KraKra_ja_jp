package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.content.pm.PackageManager
import android.util.Log
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

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
        return super.onJsAlert(view, url, message, result)
    }

    override fun onJsPrompt(
        view: WebView?,
        url: String?,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ): Boolean {
        return super.onJsPrompt(view, url, message, defaultValue, result)
    }

    override fun onJsConfirm(
        view: WebView?,
        url: String?,
        message: String?,
        result: JsResult?
    ): Boolean {
        return super.onJsConfirm(view, url, message, result)
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
