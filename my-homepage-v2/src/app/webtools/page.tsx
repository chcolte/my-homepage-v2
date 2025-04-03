"use client"; // Client Component に変更

import { useEffect } from 'react'; // useEffect をインポート
import styles from "../page.module.css"; // 必要に応じてインポート

// ページ名を定数として定義
const PAGE_NAME = "WebTools";

export default function WebToolsPage() {
  // useEffect を使ってタイトルを設定
  useEffect(() => {
    // 定数を使用してタイトルを設定
    document.title = `Chcolte.com / ${PAGE_NAME}`;
  }, []); // マウント時に一度だけ実行

  return (
    // <main className={styles.siteMain}> {/* layout.tsx で main を追加したので不要かも */}
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{PAGE_NAME}</h1>
          <p>便利なWebツールを公開しています。</p>
          {/* 他のコンテンツ */}
        </article>
      </div>
    // </main>
  );
} 