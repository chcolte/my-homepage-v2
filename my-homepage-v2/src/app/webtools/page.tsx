"use client";

import { useEffect } from 'react';
import styles from "../page.module.css";

const PAGE_NAME = "WebTools";

export default function WebToolsPage() {
  // useEffect を使ってタイトルを設定
  useEffect(() => {
    document.title = `Chcolte.com / ${PAGE_NAME}`;
  }, []);

  return (
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{PAGE_NAME}</h1>
          <p>便利なWebツールを公開しています。</p>
          {/* 他のコンテンツ */}
        </article>
      </div>
  );
} 