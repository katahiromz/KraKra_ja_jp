// KraKraの翻訳部。
// Copyright (c) 2023 Katayama Hirofumi MZ. All Rights Reserved.

import android.content.Context
import android.content.res.Configuration
import java.util.Locale

// 複数の翻訳版を有効にするために、任意の翻訳版のコンテキストを作成できるようにする。
// https://qiita.com/tarumzu/items/b076c4635b38366cddee
fun Context.createLocalizedContext(locale: Locale): Context {
    val res = resources
    val config = Configuration(res.configuration)
    config.setLocale(locale)
    return createConfigurationContext(config)
}
