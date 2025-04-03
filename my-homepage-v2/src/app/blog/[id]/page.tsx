import styles from "../../page.module.css"; // 相対パスはこれで正しいはずです

// 将来的にmicroCMSから取得する記事データの型定義（例）
type ArticleDetail = {
  id: string;
  title: string;
  content: string; // HTML形式など
  publishedAt: string;
};

// ダミーデータ取得関数（将来はmicroCMSから取得）
async function getDummyArticle(id: string): Promise<ArticleDetail | null> {
  if (id === 'first-post') {
    return { id: 'first-post', title: '最初の投稿', content: '<p>これが最初の投稿の本文です。</p>', publishedAt: '2024-01-01' };
  }
  if (id === 'second-post') {
    return { id: 'second-post', title: '2番目の投稿', content: '<p>2番目の投稿の本文はこちら。</p>', publishedAt: '2024-01-15' };
  }
  return null; // 見つからない場合
}

// ページコンポーネント
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // --- 将来のmicroCMSデータ取得処理 ---
  // const article = await fetchMicroCMSArticle(id);
  const article = await getDummyArticle(id);
  // --- ここまで ---

  if (!article) {
    // 記事が見つからない場合の処理
    // import { notFound } from 'next/navigation';
    // notFound();
    return (
        <main className={styles.siteMain}>
            <div className={styles.container}>
                <article className={styles.contentArea}>
                    <h1>記事が見つかりません</h1>
                    <p>指定された記事は存在しないか、削除された可能性があります。</p>
                </article>
            </div>
        </main>
    );
  }

  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{article.title}</h1>
          <p style={{ opacity: 0.7, marginBottom: '20px' }}>
            公開日: {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </div>
    </main>
  );
}

// (任意) generateStaticParams
// export async function generateStaticParams() {
//   const articles = [{ id: 'first-post' }, { id: 'second-post' }]; // ダミー
//   return articles.map((article) => ({
//     id: article.id,
//   }));
// } 