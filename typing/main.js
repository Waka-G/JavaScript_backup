//変数の初期化
/* 画面に表示する文字列を入れる変数（ここではuntypedという名前にする）を準備する */
let untyped = '';
let typed = '';
let score = 0;  //スコア機能(score)用の変数

//必要なHTML要素の取得
/* getElementById()メソッドでHTML要素（ここではuntypedfieldという名前にする）を取得する */
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start'); //スタート
const count = document.getElementById('count');

//複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

//ランダムなテキストを表示
const createText = () => {

    //正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    /* 第1ステップ:配列の要素数を利用する
      Math.random()では0以上1未満の数字(0.00...から0.99...まで)が出力される
      console.log(Math.random() * textLists.length); */

    /* 第2ステップ:小数点以下を排除する
    　Math.floor()で小数点を切り捨て、整数にする　
    　注意：似たメソッドにMath.ceil()があるが、小数点切り上げするメソッドになるので今回の仕様では使わない 
    　console.log(Math.floor(Math.random() * textLists.length));*/
    
    //配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);
    //配列からランダムにテキストを取得し画面に表示する
    /* 配列textListsの0番目（textLists[0]）をuntypedに代入する
        変数untypedを定数untypedfieldのtextContentプロパティに代入する→画面に表示される */
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};
// createText();

//キー入力の判定
const keyPress = e => {

    //誤タイプの場合
    if(e.key != untyped.substring(0,1)){
        //誤タイプ時にclassList.add()メソッドでclass属性（mistyped）を追加し、背景色を変更する
        wrap.classList.add('mistyped');

        //setTimeout()メソッド：指定時間後に一度だけ特定の処理を行う
        //100ms後に背景色を元に戻す 1/10秒
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        },100);
        return;
    }

    //正タイプの場合
    //スコアのインクリメント(数値に1加算すること)
    score++;

    //正タイプ時にclassList.remove()メソッドでclass属性（mistyped）を削除し、背景色を元に戻す
    wrap.classList.remove('mistyped');
    console.log(e.key);
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    //テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
        createText();
    }
};

//タイピングスキルのランクを判定
const rankCheck = score => {
    //スコアの値を返す
    //「`」バッククォートは「@キー + shiftキー」を押す
    // return `${score}文字打てました！`;

    //テキストを格納する変数を作る
    let text = '';

    //スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100) {
        //「`」バッククォートで記述する
        text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`;
    }
    else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200-score}文字です。`;
    }
    else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300-score}文字です。`;
    }
    else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    //生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n【OK】リトライ 【キャンセル】終了/ `;
};

//ゲームを終了
const gameOver = id => {
    //引数id（setInterval()メソッドの戻り値）を受け取って、
    //カウントダウンを停止してコンソールログにメッセージを表示する
    clearInterval(id);  //タイマーを停止する

    console.log('ゲーム終了！');
    //confirm ()メソッド
    //「OK」:ture「キャンセル」:falseボタン付きのダイアログを表示する。
    //戻り値でどちらのボタンがクリックされたかを判別できる
    const result = confirm(rankCheck(score));

    //定数resultから「OK」:tureを戻り値として取得した際に、
    //ブラウザをリロードできるようにする
    if(result == true) {
        window.location.reload();
    }
};

//カウントダウンタイマー
const timer = () => {
    //タイマー部分のHTML要素(p要素)を取得する
    let time = count.textContent;

    const id = setInterval(() => {
        //カウントダウンする
        time--;
        count.textContent = time;   //p要素に現在の時間を表示する

        //カウントが0になったらタイマーを停止する
        if(time <= 0){
            // clearInterval(id);

            //カウントが0になったときに関数gameOverを呼び出す
            //関数gameOverの引数にid（setInterval()メソッドの戻り値）を渡す
            gameOver(id);
        }
    },1000);  //第２因数には１秒(1000ミリ)を設定　これで１秒間隔で処理を行う
}

//キーボードのイベント処理
// document.addEventListener('keypress', keyPress);

//ゲームスタート時の処理
start.addEventListener('click', () => {

    //カウントダウンタイマーを開始する
    timer();

    //ランダムなテキストを表示する
    createText();

    //「スタート」ボタンを非表示にする
    start.style.display = 'none';

    //キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

//最初の画面での文字列を表示
untypedfield.textContent = 'スタートボタンで開始';