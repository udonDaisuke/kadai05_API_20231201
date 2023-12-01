# アプリ名：Feel Temp
## アプリの概要
- BingMap APIおよびOpenWeather APIを利用した。目的地の気温を知ることができる。<br>また現状の服装、体感(寒い暑い)の情報をもとに、アプリがアドバイスをくれる。<br>※アドバイスはではない簡易的な物

## 使用方法　※位置情報の使用を承認している前提
1.  `From:***`に現在地(入力不要)、`To: `に目的地の住所を入力する欄があるので、入力し`Enter`を押す。<br>
**⇒現在地、目的地の天気と気温が表示される**
1.  着ていくものを選択する<br>
**⇒チェックすると右側のピクトグラムが服を着る**
1.  現状の体感を選択(さぶい/ややさぶい/普通/やや暑い/暑い)し`これでいく`をクリックする<br>
**⇒現状の体感温度的に現地ではどのような服装が良いか提案してくれる**
    - 現地で雨が降っている<br> 「傘を持って行った方がいいですよ！」 
    - 寒い(暑い)と感じていて現地も同じくらいの気温<br> 「もっとあったかい服を着ていきましょう(上着いらないよ)」
    - 寒い(暑い)と感じていて現地とは逆<br> 「向こうでは上着いらないかも(上着持っていくべき！)」
    - 服をきていない<br> 「かぜひくよ！」

## 苦戦したところ
 - APIを隠した状態でBing+BMapQueryが動作する状況を作ることに時間がかかってしまった。
    - やったこと<br>
        1. **APIkeyを～api_key.js内に`EXPORT`文つきで記載し、`.gitignore`に登録**
        1. **BingMapAPIの呼び出しを従来使っていたものから変更**<br>
            `<script src="~~URL~~KEY=xxxxxxxxx" async ***></script>` <br>
        としていたものを,下記のように変更。これによってAPIキー部分を変数として与えることができた。<br>
        ```html
        <script type ="module"> 
            import {api_key} from "./setting/bingmap_api_key.js"
            import { api_key_weather } from "./setting/openweather_api_key.js"
            window.api_key_weather = api_key_weather

            let script = document.createElement("script")
            script.src = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${api_key}`
            script.async = true
            script.defer = true
            document.body.appendChild(script)
        </script>
        ```
        1. **地図情報取得や天気情報の取得はindex.htmlに記載**<br>
            こうしないとbingmap起動時のコールバック関数が上手く動かず、情報の取得が困難となった。<br>また、地図情報の取得は非同期で行われるため、position(緯度経度を取得するために必要)がundefinedになってしまう。これを回避するように処理を工夫したが、結果として、天気情報の取得＆それに伴うHTML要素の追加も非同期の関数内に含める必要があり、習得が甘い部分もあり、かなり難しかった。<br>
            - async function(){~ await~~}
            - funct().then()
            - promiss<br>
            **⇒複合的に使ってみたものの正攻法なのかは不明。要調査**
## 反省
- FIREBASEに記録を残すなどして、過去の選択に対して実際どうだった？を記録して、提案に役立てる方式を当初は想定していた。
- APIはメソッドがあるもの,単純にfetchするだけで良いものさまざまある。
　今回のBingmap(latitude,longituteを取得)、OpenWeather(latitude,longituteを指定して、天気を取得)のAPIのようにAPIの選び方によっては、情報を渡すだけでそのまま使えるものもあり、組み合わせによってはつなぎの処理が簡単にできる。各APIの使用をしっかり把握してから使う事が重要だと感じた。
## 参考


