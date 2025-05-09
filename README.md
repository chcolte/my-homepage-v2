# my-homepage-v2
2代目ホームページ by Nextjs

### dependences
- NextJS
- microCMS

### 使い方
- my-homepage-v2/my-homepage-v2に.env.localファイルを作成する
- microCMSにアカウントを作る
- その中に以下の値を入れる
```
MICROCMS_SERVICE_DOMAIN=yourdomain
MICROCMS_API_KEY=yourAPIKey012345abcde
```
- npm install

一旦テストしたい場合
- npm run dev
- localhost:3000　にアクセス

プロダクションを作りたい場合
- npm run build
- npm run start
- localhost:3000 にアクセス
