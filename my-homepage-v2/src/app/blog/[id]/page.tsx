import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDetail } from '../../microcms';
import styles from "../../page.module.css";
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

type Props = {
  params: Promise<{ id: string }>; // paramsはPromise<{ id: string }> 型である
};

// 動的なメタデータを生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // params を await してから id を取り出す
    const resolvedParams = await params; // resolvedParams は { id: string } 型になる
    const id = resolvedParams.id;

    // id が存在するかチェック
    if (!id) {
      throw new Error("ID parameter is missing");
    }
    const post = await getDetail(id);
    return {
      title: `Chcolte.com / ${post.title}`,
      // description: post.description, // 必要に応じて description 等も設定可能
    };
  } catch (error) {
    // エラーが発生した場合 (記事が見つからないなど)
    console.error("Error fetching metadata for blog post:", error);
    return {
      title: "Chcolte.com / Blog Post Not Found",
    };
  }
}


export default async function BlogDetail({ params }: Props) {
  let post;
  try {
    const resolvedParams = await params; // resolvedParams は { id: string } 型になる
    const id = resolvedParams.id;

    if (!id) {
      throw new Error("ID parameter is missing");
    }
    post = await getDetail(id);
  } catch (error) {
    // microCMS からエラーが返された場合 (404など)
    console.error("Failed to fetch blog detail:", error);
    notFound(); // 404ページを表示
  }

  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 本文のサニタイズとパース
  const sanitizedContent = DOMPurify.sanitize(post.content); // サニタイズ
  const reactContent = parse(sanitizedContent); // React要素にパース

  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{post.title}</h1>

          {/* メタ情報 */}
          <div className={styles.articleMetaSingle}>
            {/* アイキャッチ画像 (あれば) */}
            {post.eyecatch && (
              <div className={styles.articleEyecatchSingle}>
                <Image
                  src={post.eyecatch.url}
                  alt=""
                  width={post.eyecatch.width}
                  height={post.eyecatch.height}
                  priority
                  style={{ maxWidth: '100%', height: 'auto' }} // レスポンシブ対応
                />
              </div>
            )}
            <div className={styles.metaItemsSingle}>
              <span className={styles.metaItem}>
                <span className="material-symbols-outlined">edit</span>
                {post.author || 'Unknown Author'}
              </span>
              {post.tags.length > 0 && (
                <span className={styles.metaItem}>
                  <span className="material-symbols-outlined">sell</span>
                  {post.tags.map((tag, index) => (
                    <span key={tag.id}>
                      {tag.name}
                      {index < post.tags.length - 1 && '/'}
                    </span>
                  ))}
                </span>
              )}
              <span className={styles.metaItem}>
                <span className="material-symbols-outlined">calendar_month</span>
                公開日: {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span className={styles.metaItem}>
                <span className="material-symbols-outlined">update</span>
                更新日: {formatDate(post.updatedAt)}
              </span>
            </div>
          </div>

          {/* 記事本文 */}
          <div className={styles.postContent}>
            {reactContent}
          </div>

        </article>
      </div>
    </main>
  );
}
