---
    position: 5
    title: パフォーマンスチューニングを勉強したのでまとめた (LightHouse編)
    description: WebSpeedHackathonOnlineVol.2に向けてパフォーマンスチューニングを勉強したときのメモ。LightHouse6を使用。
    thumbnail: https://storage.googleapis.com/portfolio21-56e7e.appspot.com/ogp/files/article-5.jpg?authuser=1
    createdDate: "2021-02-02"
    category_ids: 
        - 40000001 #パフォーマンスチューニング
    twitter: 1keiuu
    ogpURLs: 
        - https://web.dev/performance-scoring/#lighthouse-6
    ogps: 
        - {title:"", description:"", image:""}
---
<!-- ogpURLsとindexを合わせる
<ogp-card :ogpindex="0" :ogps="ogps"></ogp-card> -->

# パフォーマンスチューニングを勉強したのでまとめた (Lighthouse編)

<div class="info">
    <div class="info__inner">
        <categorychips :chips="categories"></categorychips>
        <div class="created-date">
            <Icon iconName="calendar"></Icon>
            <p>2021-02-02</p>
        </div>
    </div>
    <div class="reading-time --sp">
        <Icon  iconName="clock"></Icon>
        <p id="readingTimeSp"></p>
    </div>
        <div class="sns-link__group">
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-via="1keiuu" data-related="" data-show-count="false">Tweet</a><script defer src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</div>
<div class="thumbnail__wrapper">
    <img  width="1200px" height="630px" src="https://storage.googleapis.com/portfolio21-56e7e.appspot.com/ogp/files/article-5.jpg?authuser=1" class="thumbnail" alt="thumbnail" >
</div>

## はじめに  

Cyber Agentの[Web Speed Hackathon Vol.2](https://www.cyberagent.co.jp/careers/students/career_event/detail/id=25556)に参加するのでフロントのパフォーマンスチューニングを少し勉強しました。(執筆時は未参加)  
  
今回はLight House v6の指標についてまとめました。  
[web.dev](https://web.dev)の内容をなぞっていきます。  

## パフォーマンス測定の指標

LightHouse 6は以下の6つの指標に基づいて測定される。()の数値は重視される比率。  
  
- #### First Contentful Paint (15%)  
- #### Speed Index (15%)  
- #### Largest Contentful Paint (25%)  
- #### Time to Interactive (15%)  
- #### Total Blocking Time (25%)  
- #### Cumulative Layout Shift (5%)  
  
<br/>
<ogp-card :ogpindex="0" :ogps="ogps"></ogp-card>
<br/>

### 1. First Contentful Paint (FCP)  
weight: 15%  
  
> FCP measures how long it takes the browser to render the first piece of DOM content after a user navigates to your page.  
ユーザーがページに訪れた際に最初のDOMがレンダリングされるまでにかかる時間。  

#### 考えられる原因  
- Webフォントが読み込まれるまでテキストがレンダリングされていない  
[Ensure text remains visible during webfont load](https://web.dev/font-display/)  
  
**→ 対応:**  
1. `font-display: swap`を追加  
2. Webフォントをpreloadする  

```html
 <link rel="preload" href="/assets/Pacifico-Bold.woff2" as="font" type="font/woff2" crossorigin>
```  
  
<br/>

### 2. Speed Index 
weight:15%  
  
> Speed Index measures how quickly content is visually displayed during page load.
どれだけ速く、ページが視覚的に表示されるか。  

#### 改善策
  
- **[Minimize main thread work](https://web.dev/mainthread-work-breakdown/)**  
[レンダリングプロセス](https://developers.google.com/web/updates/2018/09/inside-browser-part3)の根幹を司るmain threadを最適化すべし。  
main threadはHTMLのparse, DOMの構築, CSSのparseと適用, そしてJSのparse, 評価, 実行と言った、コードの大部分を扱う。  
またmain threadはユーザーからの操作(イベント)に対応する為、常に忙しいが、これを後回しにするとUXへ影響する。
**対応:** (多すぎて書ききれない...)
1. web workerを使用して、JavaScriptをmain threadで使用しない。(link: [Use web workers to run JavaScript off the browser's main thread](https://web.dev/off-main-thread/))  
2. CSSで複雑なセレクタや数値計算を避ける。
<br/>

```css[ダメな例]
.box:nth-last-child(-n+1) .title { /* styles */ }
```  

3. CSSのminify, 使っていないコードの削除
4. etc...

- **[Reduce JavaScript execution time](https://web.dev/bootup-time)**
- **[Minify and compress network payloads](https://web.dev/reduce-network-payloads-using-text-compression/)**   

　MinificationとData Compressionをしよう。  

**Minification**  
　CSS,JSなどのコードファイルのminifyをしろ。(webpack v4以降なら自動でやってくれるからいらないよ👍)  

**Data Compression**  
　サーバー - クライアントのデータのやりとりを最適化しよう。GzipもしくはBrotliで。BrotliはGzipよりいいよ。  
ブラウザへ送るファイルを圧縮するには `Dynamic` と `Static` の2通りのやり方があるよ。どちらも一長一短だよ。  

**Dynamic comporession**  
リクエストが来た時にファイルを最適化するよ。手動で最適化したり、ビルド中にするより簡単だよ。けど圧縮率(?)が上がると遅延が生じるよ。  
expressではcompression middlewareライブラリを使えば静的ファイルを`gzip`でdynamic compressionできるよ。  

```javascript
const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static('public'));

const listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
```  

`Brotli`には[shrink-ray](https://github.com/aickin/shrink-ray#readme)が使えるよ〜  


・**Static comporession**  
事前に最適化して保存しておくよ。ビルドが長くなるけどアクセス時の遅延は起こらなくなるよ。  
webpackのpluginが使えるよ。  

- **[BrotliWebpackPlugin](https://github.com/mynameiswhm/brotli-webpack-plugin)**  
- **[CompressionPlugin](https://github.com/webpack-contrib/compression-webpack-plugin)**  

<br/>

```javascript[webpack.config.js]
module.exports = {
	plugins: [
		new CompressionPlugin()
	]
}
```

<br/>

### 3. Largest Contentful Paint (LCP)  
weight: 25%  
  
> The Largest Contentful Paint (LCP) metric reports the render time of the largest image or text block visible within the viewport.  
viewport内で一番重い画像やテキストのレンダリング時間。  

- `<img>`
- `<svg>`内での`<image>`
- `<video>`
- cssのbackground imageなど、`url()`を使うもの

**対応**
- 画像, cssなどの最適化
- **[Optimize LCP](https://web.dev/optimize-lcp/)**
  
### 4. Time to Interactive (TTI)  
weight: 15%  
  
> Measuring TTI is important because some sites optimize content visibility at the expense of interactivity. This can create a frustrating user experience: the site appears to be ready, but when the user tries to interact with it, nothing happens.

一定数のサイトはinteractivityを軽視してコンテンツの表示速度ばかり重視している。  
  
#### 指標  
A page is considered fully interactive when:  
- The page displays useful content, which is measured by the First Contentful Paint,  
- Event handlers are registered for most visible page elements, and  
- The page responds to user interactions within 50 milliseconds.  
  
FCPによって測定された有意なコンテンツが表示され、イベントハンドラがほとんどの要素に登録され、ユーザーの動作に50ms以内でに反応する事。  

**対応**
- **[Minimize main thread work](https://web.dev/mainthread-work-breakdown/)** (またか...)  
- **[Reduce JavaScript execution time](https://web.dev/bootup-time)** (またか...)


### 5. Total Blocking Time (TBT)  
weight: 25%  
  
> TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses.  
ユーザーの入力への返答がブロックされた時間(blocking portion)の合計。  
50ms以上かかる処理はlong taskとされる。  
例えば70msの処理は70 - 50で超過分の20msがblock portionとされる。  
参考: [Are long JavaScript tasks delaying your Time to Interactive?](https://web.dev/long-tasks-devtools/)  

**対策:**  
- Devtoolから時間がかかってるtaskがわかるよ~  
[What is causing my Long Tasks?](https://web.dev/long-tasks-devtools/#what-is-causing-my-long-tasks)  

### 6. Cumulative Layout Shift (CLS)
weight: 5%  
  
cumulative(意:累計)  

レイアウトが頻繁に変わりすぎるページだとUXを損なうからよくないよ〜

**対策**
- `width`,`height`の動的な変更ではなく、 `transform: scale()`を使おう  
- `top`, `right`, `bottom`, `left`を動的に変更せず、`transform: translate()`を使おう  

## 気付き 
- 指標は６つあるが、改善策はそれぞれに固有の物ばかりでなく共通の物が多い。  
  [Minimize main thread work(JS)](https://web.dev/mainthread-work-breakdown/)  
  [Reduce JavaScript execution time](https://web.dev/bootup-time/)  

- ブラウザ(LightHouse)でJSファイルを見てもchunkされた状態になっているので、webpackのビルドプロセスを把握する必要がありそう。  
　参考: https://qiita.com/mizchi/items/418be9abee5f785696f0

次回はwebpackの最適化とかをまとめていくつもりです。    
