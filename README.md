# タナカ ユウキのポータルサイト

<img width="1676" alt="blog_screen" src="https://user-images.githubusercontent.com/60835765/134660487-4e899857-acc0-469b-bade-dc0ba0d2396a.png">

## 機能
- 記事一覧
- カテゴリー別記事一覧
- 記事詳細
- 目次
- 関連記事
- サイトマップ
- Google Analytics

## 技術構成
- Nuxt（SSG）
- microCMS（コンテンツ）
- Netlify（Hosting, Functions）
- ESLint
- Prettier
- vuetify
- PostCSS
- typescript

## 環境変数
プロジェクトルートに.envファイルを作成し、以下の項目を設定してください。

API_KEY（microCMSのAPIキー）
SERVICE_ID（microCMSのサービスID）
GA_ID（Google AnalyticsのID）※アナリティクスで情報を収集したい場合
例:

API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
SERVICE_ID=your-service-id
GOOGLE_ANALYTICS_ID=UA-xxxxxxxxx-x


## 開発環境構築手順

```bash
# パッケージをinstall
$ npm install

# ローカルサーバー(localhost:3000) 立ち上げる
$ npm run dev

# アプリケーションを静的生成
$ npm run generate

# 生成したアプリケーションを起動
$ npm start
```


