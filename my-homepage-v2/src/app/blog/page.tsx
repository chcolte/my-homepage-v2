import { Metadata } from 'next'; // Metadata をインポート
import { getList, getTagList } from '../microcms'; // microCMS クライアント関数をインポート
import BlogListClient from './BlogListClient'; // 新しい Client Component をインポート
import styles from "../page.module.css";

// ページ名を定数として定義
const PAGE_NAME = "Blog";

// メタデータを設定 (Server Component でのみ可能)
export const metadata: Metadata = {
  title: `Chcolte.com / ${PAGE_NAME}`,
};

// revalidate オプションを追加 (任意)
// export const revalidate = 60; // 60秒ごとに再検証 (ISR)

export default async function BlogListPage() {
  // 記事一覧とタグ一覧をサーバーサイドで取得
  const articlesData = await getList({ /* クエリが必要な場合は追加, 例: limit: 10 */ });
  const allTags = await getTagList({ /* クエリが必要な場合は追加, 例: limit: 100 */ });

  // 取得したデータを Client Component に渡す
  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{PAGE_NAME}</h1>
          <p>ブログ記事の一覧です。</p>
          {/* Client Component を呼び出し、取得したデータを props として渡す */}
          <BlogListClient
            articles={articlesData.contents}
            allTags={allTags}
          />
        </article>
      </div>
    </main>
  );
} 