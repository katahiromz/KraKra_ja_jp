package com.katahiromz.krakra_ja_jp

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONArray

class MainRepository {
    companion object {
        private const val MainPrefFileKey = "MAIN_PREF_FILE"
        private const val MessageListKey = "MESSAGE_LIST"

        private fun getPrefs(context: Context): SharedPreferences {
            return context.getSharedPreferences(MainPrefFileKey, Context.MODE_PRIVATE)
        }

        fun loadMessageList(context: Context): MutableList<String> {
            val prefs = getPrefs(context)
            val json = prefs.getString(MessageListKey, null) ?: return mutableListOf()
            val messageList = mutableListOf<String>()
            val jsonArray = JSONArray(json)
            for (i in 0 until jsonArray.length()) {
                val msg = jsonArray.optString(i)
                messageList.add(msg)
            }
            return messageList
        }

        fun saveMessageList(context: Context, list: List<String>) {
            val prefs = getPrefs(context)
            if (list.isNotEmpty()) {
                val jsonArray = JSONArray()
                for (msg in list) {
                    jsonArray.put(msg)
                }
                prefs
                    .edit()
                    .putString(MessageListKey, jsonArray.toString())
                    .apply()
            } else {
                prefs
                    .edit()
                    .putString(MessageListKey, null)
                    .apply()
            }
        }

        fun clearMessageList(context: Context) {
            val prefs = getPrefs(context)
            prefs
                .edit()
                .putString(MessageListKey, null)
                .apply()
        }
    }
}