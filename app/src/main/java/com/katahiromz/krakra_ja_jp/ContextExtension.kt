import android.content.Context
import android.content.res.Configuration
import android.os.Build
import android.os.LocaleList
import java.util.*

// https://qiita.com/tarumzu/items/b076c4635b38366cddee
fun Context.createLocalizedContext(locale: Locale): Context {
    val res = resources
    val config = Configuration(res.configuration)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        config.setLocales(LocaleList(locale))
    } else {
        config.setLocale(locale)
    }
    return createConfigurationContext(config)
}
