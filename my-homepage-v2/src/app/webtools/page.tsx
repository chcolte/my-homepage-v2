import styles from "../page.module.css"; // 相対パスはこれで正しいはずです

export default function WebToolsPage() {
  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>WebTools</h1>
          <p>便利なWebツールを提供するページです。（準備中）</p>
          {/* 必要に応じて内容を追加 */}
        </article>
      </div>
    </main>
  );
} 