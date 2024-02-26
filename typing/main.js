//変数の初期化
/* 画面に表示する文字列を入れる変数（ここではuntypedという名前にする）を準備する */
let untyped = '';
let typed = '';

//必要なHTML要素の取得
/* getElementById()メソッドでHTML要素（ここではuntypedfieldという名前にする）を取得する */
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');

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
createText();

//キー入力の判定
const keyPress = e => {

    //誤タイプの場合
    if(e.key != untyped.substring(0,1)){
        //誤タイプ時にclassList.add()メソッドでclass属性（mistyped）を追加し、背景色を変更する
        wrap.classList.add('mistyped');
        return;
    }

    //正タイプの場合
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

//ゲームを終了

//カウントダウンタイマー

//キーボードのイベント処理
document.addEventListener('keypress', keyPress);