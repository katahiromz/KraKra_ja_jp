package com.katahiromz.krakra_ja_jp

import android.os.Bundle
import android.view.View
import android.webkit.JsPromptResult
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import com.google.android.material.dialog.MaterialAlertDialogBuilder

class MessageListDialog(
    private var mainActivity: MainActivity, private var defaultValue: String?,
    private var result: JsPromptResult?): DialogFragment()
{
    override fun onCreateDialog(savedInstanceState: Bundle?): AlertDialog {
        var messageList: MutableList<String> = MainRepository.loadMessageList(mainActivity)
        val defaultMessageList: MutableList<String> = mainActivity.getDefaultMessageList()

        if (messageList.isEmpty())
            messageList = defaultMessageList

        val customTitle: View = View.inflate(mainActivity, R.layout.message_select_dialog, null)
        val editText: EditText = customTitle.findViewById(R.id.message_text_edit)
        val clearButton: Button = customTitle.findViewById(R.id.message_clear_button)

        var checkedItem: Int = -1
        if (defaultValue != null) {
            editText.setText(defaultValue!!)

            val index = messageList.indexOf(defaultValue!!)
            if (index != -1)
                checkedItem = index
        }

        val adapter = ArrayAdapter(
            mainActivity, android.R.layout.simple_list_item_1, messageList)

        val builder = MaterialAlertDialogBuilder(mainActivity, R.style.AlertDialogTheme)
            .setCustomTitle(customTitle)
            .setSingleChoiceItems(adapter, checkedItem) { _, which ->
                editText.setText(messageList[which])
            }
            .setPositiveButton(mainActivity.getLocString(R.string.ok)) { dialog, _ ->
                val inputtedText: String = editText.text.toString()

                if (inputtedText.isNotEmpty()) {
                    val index = messageList.indexOf(inputtedText)
                    if (index != -1)
                        messageList.removeAt(index)
                    messageList.add(0, inputtedText)
                    MainRepository.saveMessageList(mainActivity, messageList)
                }

                result?.confirm(inputtedText)
                dialog.dismiss()
            }
            .setNegativeButton(mainActivity.getLocString(R.string.cancel)) { dialog, _ ->
                result?.cancel()
                dialog.dismiss()
            }
            .setNeutralButton(mainActivity.getLocString(R.string.reset)) { _, _ ->
                messageList.clear()
                messageList.addAll(defaultMessageList)
                MainRepository.saveMessageList(mainActivity, messageList)
                result?.confirm("")
            }
            .setCancelable(false)
            .create()

        clearButton.setOnClickListener {
            editText.setText("")
        }

        editText.isFocusedByDefault = true

        return builder
    }
}
