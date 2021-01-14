---
    title: 学生エンジニアが初めてハッカソンに参加してみたら学びが多かった話
    thumbnail: https://storage.googleapis.com/portfolio21-56e7e.appspot.com/products/laff/1.png
    createdDate: "2020-11-25"
    categories: [初心者, 初めて]
    twitter: 1keiuu
---
# タイトルがはいります。タイトルがはいります。タイトルがはいります。タイトルがはいります。

<div class="info">
<chip-group :chips="[{text:'初心者', color:'grey'},{text:'初めて', color:'grey'}]"></chip-group>

<div class="created-date">
<Icon iconName="calendar"></Icon>
<p>2020-11-25</p>
</div>
</div>

<img src="https://storage.googleapis.com/portfolio21-56e7e.appspot.com/products/laff/1.png" class="thumbnail" alt="thumbnail" >

## はじめに
先日JPHACKS2020でハッカソンデビューしたら、色んな学びがあったのでまとめようと思いました。
JPHACKSとは
JPHACKS(ジャパンハックス)は、学生を対象にした日本最大規模のハックイベントで、2014年より全国の複数都市で開催されています。 今年は全国を6ブロックに分けオンラインで開催されます。
引用: JPHACKS
今年はオンライン開催で、全国から約78チーム程が参加したようです。
<br>

## 開発したもの
画像分析で忘れ物を防ぐアプリ「Laff」を開発しました。

<ogp-card url="https://miro.com"></ogp-card>

https://www.youtube.com/watch?v=mVvbSJA8qvQ&feature=youtu.be 

紹介動画です(ギリギリで作ったので動画のクオリティはお察しください。。。)

「忙しい朝に忘れ物チェックをする時間が無い！」という問題を解決する為に開発しました。
あらかじめ持ち物を登録しておく事で、出かける日の朝には写真を一枚撮るだけで忘れ物を教えてくれます。
<br>

## 使用した技術
フロントはReactNativeを使ってクロスプラットフォームのモバイルアプリ化、バックエンドにRuby on Rails、DBにPostgreSQLを使いました。

<img src="https://huntr-assets.s3.amazonaws.com/users/103088073/3f4e99c5-1352-4f20-b3d9-d207f5358243">

画像分析にはGoogle Cloud Vision APIを使いました。

https://cloud.google.com/vision/?hl=ja&utm_source=google&utm_medium=cpc&utm_campaign=japac-JP-all-ja-dr-bkws-all-all-trial-e-dr-1009137&utm_content=text-ad-none-none-DEV_c-CRE_285865410190-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20T1%20%7C%20EXA%20%7C%20ML%20%7C%20M%3A1%20%7C%20JP%20%7C%20ja%20%7C%20Vision%20%7C%20General%20%7C%20en-KWID_43700016101235136-kwd-203288731207&userloc_20636-network_g&utm_term=KW_google%20cloud%20vision%20api&gclid=Cj0KCQiA-rj9BRCAARIsANB_4ACexv_wiNt0klWyag8JTJb7wrWhkvgbOozp3sP5ogmyhH_GMaVa0U4aAjCvEALw_wcB

Google Cloud Vision APIを使えばこのように写真に写っている物を分析して、その名前(ラベル)を返してくれます。 
画像分析のAPIから帰ってくるラベルは英語1単語なので、その類義語をAPIから取得し、翻訳して返す事で分析の精度を高めました。

<img src="https://huntr-assets.s3.amazonaws.com/users/103088073/9ea87c6a-92b3-4b4c-bc94-bff71190c269">

<br>

## 学んだ事 (要改善)

### 斬新かつ実用的なアイデアを考える難しさ
ハッカソン慣れしていないチームにとって一番難しい部分はここだと思います。
日頃から技術的なキャッチアップをしているだけだと「アイデアを考える」事自体あまりしないと思います。技術的な面で斬新なアプローチ(IoTやVR/AR等)が出来るメンバーが居なかったとはいえ、APIや外部サービスでカバーできるし、他のアプローチだって沢山ある筈です。
ハッカソンで良いプロダクトを作るには、限られたリソースでどれだけ柔軟に対応できるかが鍵を握るなと思いました。

### 限られた時間でプロダクトの良さを伝える難しさ
発表時間が90秒という短さだったので、プロダクトの良さを端的かつ効果的に伝える必要がありました。（90秒というのは海外のハッカソンを参考にしているらしい)
エンジニアだけでなくCEO的な役割がいたり、バランスの良いチームは強いなと思いました。

### オンラインで斬新なアイデアを考える事難しさ
学校などの都合もあり全員で集まれなかったので、アイデア出しもwebミーティングで行いました。　　アイデア出しにはmiroというサービスを使いました。便利でしたがフル活用出来たとは思えないし、進め方があまり良くなかったかなと思います。
アイデア出しにおいてツールはもちろん大事なのですが、それ以上にファシリテーター的な役割がチームにいると重宝されるなと感じました (そんなエンジニアになりたい。。。)
　
https://miro.com/


### 正しく恐れ、正しく急ぐ
このアイデアを思いつく前に「バーコードスキャンするだけで商品の産地やレビューがが分かる！」というアプリを開発まで始めていたのですが、APIの仕様をちゃんと理解していなかった為ボツになりました。
また、発表三日前にVue(Web)からあまり経験のないReactNative(モバイル)に変えるなど、見切り発車が多すぎました。
かと言って、ハッカソンに慣れていないチームが自分達のできる範囲の事をやっていては中々斬新なアイデアは生まれません。
限られた時間での開発は、要件定義と実現可能性の調査にしっかりと時間を取り、かつフルスピードで実装する必要があるなと感じました。
<br>

## まとめ
改善点がたくさん見つかり悔しい思いをしましたが、いろんな発見が出来ました。
周りの学生のレベルの高さに驚いた一方で、追い詰められた時の自分の底力も知れました。
ハッカソンに参加すれば普段の業務と違ったチーム開発が経験出来ますし、成果物に対して結果が出るという事はエンジニアとしての成長に大きく貢献すると思います。

皆さんの会社でも社内ハッカソンを導入してみてはいかがでしょうか？
普段と違うチームで普段と違う開発をすれば、絆が深まったり、お互いの知らない部分に気付けるかもしれません！