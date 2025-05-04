import { Metadata } from 'next';
import { getList, getTagList } from '../microcms';
import BlogListClient from './BlogListClient';
import styles from "../page.module.css";

// メタデータを設定
export const metadata: Metadata = {
  title: `Chcolte.com / Blog`,
};
export const dynamic = 'force-dynamic';

// revalidate オプションを追加 (任意)
// export const revalidate = 60; // 60秒ごとに再検証 (ISR)

export default async function BlogListPage() {
  // 記事一覧とタグ一覧をサーバーサイドで取得
  const articlesData = await getList();
  const allTags = await getTagList();

  // 取得したデータを Client Component に渡す
  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>Blog</h1>
          <p>ブログ記事の一覧です。</p>
          <BlogListClient
            articles={articlesData.contents}
            allTags={allTags}
          />
        </article>
      </div>
    </main>
  );
} 