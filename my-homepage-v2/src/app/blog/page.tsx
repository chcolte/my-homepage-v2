import Link from 'next/link';
import styles from "../page.module.css"; // 相対パスはこれで正しいはずです

// 将来的にmicroCMSから取得する記事データの型定義（例）
type Article = {
  id: string;
  title: string;
  publishedAt: string; // または Date 型
};

// ダミーデータ（将来はmicroCMSから取得）
const dummyArticles: Article[] = [
  { id: 'first-post', title: '最初の投稿', publishedAt: '2024-01-01' },
  { id: 'second-post', title: '2番目の投稿', publishedAt: '2024-01-15' },
];

export default async function BlogListPage() {
  // --- 将来のmicroCMSデータ取得処理 ---
  // const articles = await fetchMicroCMSData();
  const articles = dummyArticles;
  // --- ここまで ---

  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>Blog</h1>
          <p>ブログ記事の一覧です。</p>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <Link href={`/blog/${article.id}`}>
                  {article.title}
                </Link>
                <span style={{ marginLeft: '10px', fontSize: '0.9em', opacity: 0.7 }}>
                  ({new Date(article.publishedAt).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
          {/* 必要に応じてページネーションなどを追加 */}
        </article>
      </div>
    </main>
  );
} 