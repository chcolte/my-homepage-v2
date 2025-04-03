import styles from "../page.module.css"; // 相対パスはこれで正しいはずです

export default function AboutPage() {
  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>About</h1>
          <p>このサイトについての説明ページです。</p>
          {/* 必要に応じて内容を追加 */}
        </article>
      </div>
    </main>
  );
} 