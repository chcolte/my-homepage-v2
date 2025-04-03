"use client"; // Client Component に変更

// import { useState, useEffect } from 'react'; // 不要
import { useEffect } from 'react'; // useEffect をインポート
import Image from "next/image";
import styles from "./page.module.css"; // スタイルは引き続き使用

export default function Home() {
  // useEffect を使ってタイトルを設定
  useEffect(() => {
    document.title = "Chcolte.com";
  }, []); // マウント時に一度だけ実行

  // テーマ関連の state, 定数, useEffect, handleThemeToggle は削除

  return (
    // <main className={styles.siteMain}> {/* layout.tsx で main を追加したので不要かも */}
      <div className={styles.container}>
        <article className={styles.contentArea}>
          {/* コンテンツを元に戻す */}
          <h1>Hello, NextJS!</h1>
          {/* <p>このサイトはChocolatteのポートフォリオ兼ブログサイトです。</p> */} {/* この行を削除 */}
          <p>
            hello, NextJS!
          </p>
          <p>
            現在、簡易運用中
          </p>
          <p style={{ marginTop: '20px' }}>
            <button className={styles.buttonPrimary}>サンプルボタン</button>
          </p>
        </article>
      </div>
    // </main>
  );
}
