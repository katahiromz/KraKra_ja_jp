// KraKraの翻訳部。
// Copyright (c) 2023 Katayama Hirofumi MZ. All Rights Reserved.

import android.content.Context
import android.content.res.Configuration
import android.os.Build
import android.os.LocaleList
import java.util.*

// 複数の翻訳版を有効にするために、任意の翻訳版のコンテキストを作成できるようにする。
// https://qiita.com/tarumzu/items/b076c4635b38366cddee
fun Context.createLocalizedContext(locale: Locale): Context {
    val res = resources
    val config = Configuration(res.configuration)
    // 場合分けで古いOSに対応。
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        config.setLocales(LocaleList(locale))
    } else {
        config.setLocale(locale)
    }
    return createConfigurationContext(config)
}
