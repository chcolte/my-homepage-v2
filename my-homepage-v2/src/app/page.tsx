// "use client"; // 不要になったためコメントアウトまたは削除

// import { useState, useEffect } from 'react'; // 不要
// import Image from "next/image"; // 不要
import styles from "./page.module.css"; // スタイルは引き続き使用

export default function Home() {
  // テーマ関連の state, 定数, useEffect, handleThemeToggle は削除

  return (
    // ヘッダーが layout.tsx に移動したため、<main> タグから開始
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>Hello, NextJS!</h1>
          <p>
            hello, NextJS! こんにちは、このウェブサイトはchocolatteの管理するウェブサイトで、2024年2月に世に解き放たれました。そして、このトップページはブログや今後作成するであろうウェブツール等へつながるハブとしてのページとなります。
          </p>
          <p>
            現在、構築運用中
          </p>
          <p style={{ marginTop: '20px' }}>
            <button className={styles.buttonPrimary}>サンプルボタン</button>
          </p>
        </article>
      </div>
    </main>
    // <></> フラグメントも不要
  );
}
