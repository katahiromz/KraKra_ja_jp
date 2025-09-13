// KraKraのメインアクティビティ。
// Copyright (c) 2023 Katayama Hirofumi MZ. All Rights Reserved.

package com.katahiromz.krakra_ja_jp

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.os.StrictMode
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.speech.tts.TextToSpeech
import android.view.View
import android.view.WindowManager
import android.webkit.ValueCallback
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import timber.log.Timber
import java.util.Locale

// 複数の翻訳版を有効にするために、任意の翻訳版のコンテキストを作成できるようにする。
// https://qiita.com/tarumzu/items/b076c4635b38366cddee
fun Context.createLocalizedContext(locale: Locale): Context {
    val res = resources
    val config = Configuration(res.configuration)
    config.setLocale(locale)
    return createConfigurationContext(config)
}

/////////////////////////////////////////////////////////////////////
// region 定数。

// トーストの種類 (showToast用)
const val SHORT_TOAST = 0
const val LONG_TOAST = 1

// スナックの種類 (showSnackbar用)
const val SHORT_SNACK = 0
const val LONG_SNACK = 1
const val ACTION_SNACK_OK = 2
// TODO: Add more snack

// endregion

class MainActivity : AppCompatActivity(), ValueCallback<String>, TextToSpeech.OnInitListener {
    /////////////////////////////////////////////////////////////////////
    // region 共通

    // デバッグログにTimberを使用する。
    private fun initTimber() {
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }

    // Toast を表示する。
    fun showToast(text: String, typeOfToast: Int) {
        when (typeOfToast) {
            SHORT_TOAST -> {
                lastToast = Toast.makeText(this, text, Toast.LENGTH_SHORT)
                lastToast?.show()
            }
            LONG_TOAST -> {
                lastToast = Toast.makeText(this, text, Toast.LENGTH_LONG)
                lastToast?.show()
            }
            else -> {
                Timber.w("showToast: Unknown typeOfToast: $typeOfToast. Displaying short toast as default.")
            }
        }
    }
    private var lastToast : Toast? = null
    // Toastをキャンセルする。
    fun cancelToast() {
        if (lastToast != null) {
            lastToast?.cancel()
            lastToast = null
        }
    }

    // Snackbar を表示する。
    fun showSnackbar(text: String, typeOfSnack: Int) {
        val view = findViewById<View>(android.R.id.content)
        when (typeOfSnack) {
            SHORT_SNACK -> {
                lastSnackbar = Snackbar.make(view, text, Snackbar.LENGTH_SHORT)
                lastSnackbar?.show()
            }
            LONG_SNACK -> {
                lastSnackbar = Snackbar.make(view, text, Snackbar.LENGTH_LONG)
                lastSnackbar?.show()
            }
            ACTION_SNACK_OK -> {
                lastSnackbar = Snackbar.make(view, text, Snackbar.LENGTH_INDEFINITE)
                val buttonText = getLocString(R.string.ok)
                lastSnackbar?.setAction(buttonText) {
                    // TODO: Add action
                }
                lastSnackbar?.show()
            }
            // TODO: Add more Snack
            else -> {
                Timber.w("showSnackbar: Unknown typeOfSnack: $typeOfSnack. Snackbar not shown.")
            }
        }
    }
    private var lastSnackbar : Snackbar? = null
    // Snackbarをキャンセルする。
    fun cancelSnackbar() {
        if (lastSnackbar != null) {
            lastSnackbar?.dismiss()
            lastSnackbar = null
        }
    }

    // 画面の明るさを調整する。
    private var screenBrightness: String = "normal"
    fun setBrightness(value: String) {
        runOnUiThread {
            val params: WindowManager.LayoutParams = window.attributes
            if (value == "brighter") {
                params.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_FULL
            } else {
                params.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
            }
            window.attributes = params
        }

        screenBrightness = value
    }

    // アプリを終了する。
    fun finishApp() {
        finish() // 完全には終了しない（タスクリストに残る）。
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        Timber.i("onWindowFocusChanged")
        super.onWindowFocusChanged(hasFocus)
    }

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region パーミッション関連
    // 参考：https://qiita.com/sokume2106/items/46bd286569a6e7fac43d

    private val audioRecordingPermissionChecker =
        PermissionChecker(
            this,
            Manifest.permission.RECORD_AUDIO,
            onDenied = {
                showToast(getLocString(R.string.cant_use_microphone), LONG_TOAST)
                requestCamera()
            },
            onShowRationale = { onRequest ->
                val title = getLocString(R.string.app_name)
                val message = getLocString(R.string.needs_microphone)
                MaterialAlertDialogBuilder(this, R.style.AlertDialogTheme)
                    .setTitle(title)
                    .setMessage(message)
                    .setPositiveButton(getLocString(R.string.ok)) { _, _ -> onRequest() }
                    .setCancelable(false)
                    .show()
            }
        )

    private val vibePermissionChecker =
        PermissionChecker(
            this,
            Manifest.permission.VIBRATE,
            onDenied = {
                showToast(getLocString(R.string.cant_use_vibe), LONG_TOAST)
                requestVibe()
            },
            onShowRationale = { onRequest ->
                val title = getLocString(R.string.app_name)
                val message = getLocString(R.string.needs_vibe)
                MaterialAlertDialogBuilder(this, R.style.AlertDialogTheme)
                    .setTitle(title)
                    .setMessage(message)
                    .setPositiveButton(getLocString(R.string.ok)) { _, _ -> onRequest() }
                    .setCancelable(false)
                    .show()
            }
        )

    private fun requestAudioRecoding() {
        val audioCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
        if (audioCheck != PackageManager.PERMISSION_GRANTED) {
            audioRecordingPermissionChecker.runWithPermission {
                requestCamera()
            }
        } else {
            requestCamera()
        }
    }

    private val cameraPermissionChecker =
        PermissionChecker(
            this,
            Manifest.permission.CAMERA,
            onDenied = {
                showToast(getLocString(R.string.cant_use_camera), LONG_TOAST)
            },
            onShowRationale = { onRequest ->
                val title = getLocString(R.string.app_name)
                val message = getLocString(R.string.needs_camera)
                MaterialAlertDialogBuilder(this, R.style.AlertDialogTheme)
                    .setTitle(title)
                    .setMessage(message)
                    .setPositiveButton(getLocString(R.string.ok)) { _, _ -> onRequest() }
                    .setCancelable(false)
                    .show()
            }
        )

    private fun requestCamera() {
        val cameraCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
        if (cameraCheck != PackageManager.PERMISSION_GRANTED) {
            cameraPermissionChecker.runWithPermission {}
        }
    }

    private fun requestVibe() {
        val vibeCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.VIBRATE)
        if (vibeCheck != PackageManager.PERMISSION_GRANTED) {
            vibePermissionChecker.runWithPermission {}
        }
    }

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region イベントハンドラ関連

    // アクティビティの作成時。
    override fun onCreate(savedInstanceState: Bundle?) {
        Timber.i("onCreate")

        setStrictMode()

        // おまじない。
        window.attributes.layoutInDisplayCutoutMode =
            WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS

        // 最初の画面を表示する。
        installSplashScreen()

        super.onCreate(savedInstanceState)

        // レイアウト ビューを指定する。
        setContentView(R.layout.activity_main)

        // アクションバーを隠す。
        // Theme.MaterialComponents.DayNight.NoActionBarで指定できるので省略。
        //supportActionBar?.hide()

        // 録音の権限を取得する。
        val audioCheck =
            ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
        if (audioCheck != PackageManager.PERMISSION_GRANTED) {
            requestAudioRecoding()
        }
        // 振動の権限を取得する。
        val vibeCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.VIBRATE)
        if (vibeCheck != PackageManager.PERMISSION_GRANTED) {
            requestVibe()
        }

        // WebViewを初期化。
        initWebView(savedInstanceState)

        // TextToSpeechを初期化。
        initTextToSpeech()

        // ロケールをセットする。
        setCurLocale(Locale.getDefault())

        // Timberを初期化。
        initTimber()

        // システムバーが変更された場合を検出し、Web側に渡す。
        ViewCompat.setOnApplyWindowInsetsListener(window.decorView) { view, insets ->
            val sysBarsVisible = insets.isVisible(WindowInsetsCompat.Type.systemBars())
            var str = "SAI_OnAndroidSystemBarsChanged("
            str += sysBarsVisible.toString()
            str += ")"
            Timber.i(str)
            //webView?.evaluateJavascript(str) {} // 現在、無効。
            WindowInsetsCompat.toWindowInsetsCompat(view.onApplyWindowInsets(insets.toWindowInsets()))
        }

        // 「戻る」ボタンのコールバックを登録。
        onBackPressedDispatcher.addCallback(this, onBackPressedCallback)
    }

    // 「戻る」ボタンをサポートするコールバック関数。
    private val onBackPressedCallback: OnBackPressedCallback = object : OnBackPressedCallback(true) {
        override fun handleOnBackPressed() {
            // 'go_back' メッセージを投函する。おそらく'message'イベントリスナが受け取るはず。
            webView?.evaluateJavascript("postMessage('go_back');") { }
        }
    }

    // アクティビティの開始時。
    override fun onStart() {
        Timber.i("onStart")
        super.onStart() // 親にも伝える。
    }

    private var speechVoiceVolume: Float = 1.0f

    // アクティビティの復帰時。
    override fun onResume() {
        Timber.i("onResume")
        super.onResume() // 親にも伝える。

        // ウェブビューを復帰。
        webView?.onResume()

        // テキストがあればスピーチを再開。
        if (theText != "") {
            speechText(theText, speechVoiceVolume)
        }

        // 明るさを復帰。
        setBrightness(screenBrightness)

        // 振動を再開。
        if (hasVibratorInitialized && oldVibratorLength > 0)
            startVibrator(-1)
    }

    // アクティビティの一時停止時。
    override fun onPause() {
        Timber.i("onPause")
        super.onPause() // 親にも伝える。

        // ウェブビューも一時停止。
        webView?.onPause()

        // スピーチを停止する。
        stopSpeech()

        // 振動を停止。
        if (hasVibratorInitialized)
            stopVibrator()
    }

    // アクティビティの停止時。
    override fun onStop() {
        Timber.i("onStop")
        super.onStop() // 親にも伝える。

        // スピーチを停止する。
        stopSpeech()

        // 振動を停止。
        if (hasVibratorInitialized && oldVibratorLength > 0)
            stopVibrator()
    }

    // アクティビティの破棄時。
    override fun onDestroy() {
        Timber.i("onDestroy")

        // ウェブビューを破棄。
        webView?.destroy()

        // TextToSpeechを破棄。
        tts?.shutdown()

        super.onDestroy() // 親にも伝える。
    }

    // 値を受け取るのに使う。ValueCallback<String>より継承。
    override fun onReceiveValue(value: String) {
        resultString = value
    }
    private var resultString = ""

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region WebView関連

    // ウェブビュー オブジェクト。
    private var webView: WebView? = null

    // クロームクライアント。
    private var chromeClient: MyWebChromeClient? = null

    // ウェブビューを初期化する。
    private fun initWebView(savedInstanceState: Bundle?) {
        // 以前の状態を復元する。
        // SEE ALSO: https://twigstechtips.blogspot.com/2013/08/android-retain-instance-of-webview.html
        if (webView != null && savedInstanceState != null) {
            webView?.restoreState(savedInstanceState)
            return
        }

        // ウェブビューのビューを取得する。
        webView = findViewById(R.id.web_view)

        // webViewがnullの場合、以降の処理は行わない
        webView?.let { webViewInstance ->
            initWebSettings(webViewInstance) // webViewインスタンスを渡す
            initWebViewClient()
            initChromeClient(webViewInstance) // webViewインスタンスを渡す
        } ?: Timber.e("WebView (R.id.web_view) not found in layout.")
    }

    // ウェブビュー クライアントを初期化する。
    private fun initWebViewClient() {
        webView?.webViewClient = MyWebViewClient(object : MyWebViewClient.Listener {
            override fun onReceivedError(view: WebView?, request: WebResourceRequest?,
                                         error: WebResourceError?) {
                val description = error?.description?.toString()
                Timber.i("onReceivedError: %s", description)
            }

            override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?,
                                             errorResponse: WebResourceResponse?) {
                Timber.i("onReceivedHttpError")
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                Timber.i("onPageFinished")
                findViewById<TextView>(R.id.loading).visibility = View.GONE
            }
        })
    }

    // クロームクライアントを初期化する。
    private fun initChromeClient(currentWebView: WebView) {
        // まず、クロームクライアントを作成する。
        chromeClient = MyWebChromeClient(this, object : MyWebChromeClient.Listener {
            override fun onSpeech(text: String, volume: Float) {
                Timber.i("onSpeech")
                theText = text // スピーチテキストをセットする。
                speechText(text, volume) // スピーチを開始する。
            }

            override fun onShowToast(text: String, typeOfToast: Int) {
                showToast(text, typeOfToast) // Toastを表示する。
            }

            override fun onShowSnackbar(text: String, typeOfSnack: Int) {
                showSnackbar(text, typeOfSnack) // Snackbarを表示する。
            }

            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                val bar: ProgressBar = findViewById(R.id.progressBar)
                bar.progress = newProgress
                if (newProgress == 100)
                    bar.visibility = View.INVISIBLE // 進捗が完了したらプログレスを非表示にする。
            }

            override fun onBrightness(value: String) {
                setBrightness(value) // 明るさを指定する。
            }

            override fun onFinishApp() {
                finishApp() // アプリを終了する。
            }

            override fun onStartVibrator(length: Int) {
                startVibrator(length)
            }

            override fun onStopVibrator() {
                stopVibrator()
            }
        })
        currentWebView.webChromeClient = chromeClient

        // JavaScript側からメソッドを呼び出せるインターフェイスを提供する。
        currentWebView.addJavascriptInterface(chromeClient!!, "android")

        // URLを指定してウェブページを読み込む。
        currentWebView.loadUrl(getLocString(R.string.url))
    }

    // ウェブ設定を初期化する。
    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebSettings(currentWebView: WebView) {
        // 背景色は黒。
        currentWebView.setBackgroundColor(0)

        // 設定を取得する。
        val settings = currentWebView.settings

        settings.javaScriptEnabled = true // JavaScriptを有効化。
        settings.domStorageEnabled = true // localStorageを有効化。
        settings.mediaPlaybackRequiresUserGesture = false // ジェスチャーなくてもメディア反応可。
        if (BuildConfig.DEBUG) {
            settings.cacheMode = WebSettings.LOAD_NO_CACHE // デバッグ中はキャッシュしない。
            WebView.setWebContentsDebuggingEnabled(true) // デバッギングを有効にする。
        }

        // JavaScript側からKraKraのバージョン情報を取得できるようにする。
        val versionName = getVersionName()
        settings.userAgentString += "/KraKra-android-app/$versionName/"
    }

    // バージョン名を取得する。
    private fun getVersionName(): String {
        val appName: String = this.packageName
        val pm: PackageManager = this.packageManager
        val pi: PackageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            pm.getPackageInfo(appName, PackageManager.PackageInfoFlags.of(PackageManager.GET_META_DATA.toLong()))
        } else {
            pm.getPackageInfo(appName, PackageManager.GET_META_DATA)
        }
        if (pi.versionName != null)
            return pi.versionName!!
        return "(unknown version)"
    }

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region ロケール関連

    private var currLocale: Locale = Locale.ENGLISH
    var currLocaleContext: Context? = null

    // 現在のロケールをセットする。
    fun setCurLocale(locale: Locale) {
        currLocale = locale
        currLocaleContext = null

        // TextToSpeechにもロケールをセットする。
        if (isSpeechReady && tts != null) {
            if (tts!!.isLanguageAvailable(locale) >= TextToSpeech.LANG_AVAILABLE) {
                tts!!.language = locale
            } else {
                Timber.w("Locale $locale not available for TTS.")
            }
        } else {
            // TTSが準備できていない場合は、onInitで再度ロケール設定を試みるか、
            // 準備完了後に明示的に設定するロジックが必要になることがあります。
            // 現状では、準備完了時にデフォルトロケールが設定されます。
        }
    }

    // ローカライズされた文字列を取得する。複数ロケール対応のため、特殊な実装が必要。
    private fun getLocString(id: Int, locale: Locale): String {
        if (currLocaleContext == null) {
            currLocaleContext = applicationContext.createLocalizedContext(locale)
        }
        return currLocaleContext!!.getString(id)
    }
    fun getLocString(id: Int): String {
        return getLocString(id, currLocale)
    }

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region TextToSpeech関連

    private var tts: TextToSpeech? = null // TextToSpeechオブジェクト。
    private var isSpeechReady = false // スピーチの準備が完了したか？
    private var theText = "" // スピーチテキスト。

    // TextToSpeechを初期化する。
    private fun initTextToSpeech() {
        // 既存のttsインスタンスがあればシャットダウンする。
        tts?.stop()
        tts?.shutdown()
        // 初期化。
        tts = TextToSpeech(this, this)
    }

    // TextToSpeechのために用意された初期化完了ルーチン。
    // TextToSpeech.OnInitListener
    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isSpeechReady = true
        }
    }

    // スピーチを開始する。
    fun speechText(text: String, volume: Float) {
        if (isSpeechReady && tts != null) {
            val params = Bundle()
            val speed = 0.3f
            val pitch = 0.8f
            if (volume >= 0)
                speechVoiceVolume = volume
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, speechVoiceVolume)
            tts?.setPitch(pitch)
            tts?.setSpeechRate(speed)
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, params, "utteranceId_speech")
        } else {
            Timber.w("tts is not ready")
        }
    }

    // スピーチを停止する。
    private fun stopSpeech() {
        if (isSpeechReady) {
            tts?.stop()
        }
    }

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region 振動関連

    private var hasVibratorInitialized: Boolean = false // 初期化成功フラグ
    private var oldVibratorLength: Int = 0
    private var vibratorManager: VibratorManager? = null
    private var vibrator: Vibrator? = null

    @Suppress("DEPRECATION")
    fun startVibrator(length: Int) {
        Timber.i("startVibrator")

        if (!hasVibratorInitialized) { // まだ初期化試行していない場合
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                val vm = getSystemService(VIBRATOR_MANAGER_SERVICE) as? VibratorManager // 安全キャスト
                if (vm == null) {
                    Timber.i("startVibrator: VibratorManager service not available.")
                    return // 初期化失敗
                }
                vibratorManager = vm
                vibrator = vibratorManager?.defaultVibrator
            } else {
                val v = getSystemService(VIBRATOR_SERVICE) as? Vibrator // 安全キャスト
                if (v == null) {
                    Timber.i("startVibrator: Vibrator service not available.")
                    return // 初期化失敗
                }
                vibrator = v
            }

            if (vibrator?.hasVibrator() != true) { // hasVibrator() も null 安全に呼び出す
                Timber.i("Device does not have a vibrator.")
                vibrator = null // 実際に振動機能がない場合は null に戻す
                return // 初期化失敗（振動機能なし）
            }
            hasVibratorInitialized = true // 初期化成功
            Timber.i("Vibrator initialized successfully.")
        }

        // vibrator が null であれば何もしない
        val currentVibrator = vibrator ?: return
        Timber.i("Has vibrator and initialized.")

        // いったん、振動を止める。
        currentVibrator.cancel()

        // -1だった場合は古い値を使う。
        var len = length
        if (len == -1)
            len = oldVibratorLength

        if (len <= 0) { // 長さが0以下なら何もしない
            oldVibratorLength = 0 // 停止扱いにする
            return
        }

        val timeout: Long = len.toLong()
        // createOneShot は API 26 以上
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val effect = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q && currentVibrator.hasAmplitudeControl()) {
                VibrationEffect.createOneShot(timeout, VibrationEffect.DEFAULT_AMPLITUDE) // API 29から DEFAULT_AMPLITUDE が public
            } else {
                VibrationEffect.createOneShot(timeout, VibrationEffect.DEFAULT_AMPLITUDE) // 古いAPIでは振幅制御不可の場合がある
            }
            currentVibrator.vibrate(effect)
        } else {
            // API 26 未満では vibrate(long) を使用
            currentVibrator.vibrate(timeout)
        }

        // 値を覚えておく。
        oldVibratorLength = len
    }

    fun stopVibrator() {
        Timber.i("stopVibrator")
        // vibrator が null であれば何もしない
        vibrator?.cancel()
        oldVibratorLength = 0
    }

    // endregion

    /////////////////////////////////////////////////////////////////////
    // region その他の設定

    private fun setStrictMode() {
        if (BuildConfig.DEBUG) {
            StrictMode.setThreadPolicy(
                StrictMode.ThreadPolicy.Builder()
                    .detectAll()
                    .build()
            )
            StrictMode.setVmPolicy(
                StrictMode.VmPolicy.Builder()
                    .detectAll()
                    .build()
            )
        }
    }

    // endregion
}
