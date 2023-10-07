// 参考：https://qiita.com/sokume2106/items/46bd286569a6e7fac43d

package com.katahiromz.krakra_ja_jp

import androidx.activity.result.contract.ActivityResultContracts

class PermissionChecker(
    private val activity: MainActivity,
    private val permission: String,
    private val onDenied: () -> Unit = {},
    private val onShowRationale: (onRequest: () -> Unit) -> Unit = {}
) {
    private var onGranted: () -> Unit = {}

    private val launcher =
        activity.registerForActivityResult(
            ActivityResultContracts.RequestPermission()) { isGranted ->
            when {
                isGranted -> onGranted()
                else -> onDenied()
            }
        }

    fun runWithPermission(onGranted: () -> Unit) {
        this.onGranted = onGranted
        when {
            activity.shouldShowRequestPermissionRationale(permission) -> onShowRationale {
                launcher.launch(permission)
            }
            else -> {
                launcher.launch(permission)
            }
        }
    }
}