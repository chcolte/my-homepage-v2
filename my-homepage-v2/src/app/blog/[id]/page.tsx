import { Metadata } from 'next';
import { notFound } from 'next/navigation'; // notFound をインポート
import { getDetail } from '../../microcms'; // getDetail をインポート
import styles from "../../page.module.css";
import Image from 'next/image'; // Image をインポート
// import parse from 'html-react-parser'; // HTML を安全にパースする場合 (別途インストールが必要: npm install html-react-parser)
// import DOMPurify from 'isomorphic-dompurify'; // サニタイズする場合 (別途インストールが必要: npm install isomorphic-dompurify)

type Props = {
  params: Promise<{ id: string }>; // params が Promise<{ id: string }> 型であることを明示
};

// 動的なメタデータを生成
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
      // description: post.description, // 必要に応じて description も設定
    };
  } catch (error) {
    // エラーログを追加
    console.error("Error fetching metadata for blog post:", error);
    // エラーが発生した場合 (記事が見つからないなど)
    return {
      title: "Chcolte.com / Blog Post Not Found",
    };
  }
}

// revalidate オプションを追加 (任意)
// export const revalidate = 60;

export default async function BlogDetail({ params }: Props) {
  let post;
  try {
    // こちらも params を await してから id を取り出す
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

  // 日付フォーマット関数 (必要に応じて調整)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // --- 本文の HTML を安全に表示する方法 ---
  // 1. dangerouslySetInnerHTML (シンプルだがXSSリスクあり)
  // const sanitizedContent = post.content; // サニタイズしない場合

  // 2. DOMPurify でサニタイズしてから dangerouslySetInnerHTML (推奨)
  // import DOMPurify from 'isomorphic-dompurify';
  // const sanitizedContent = DOMPurify.sanitize(post.content);

  // 3. html-react-parser で React 要素に変換 (より安全)
  // import parse from 'html-react-parser';
  // const reactContent = parse(post.content);

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
                  alt="" // 装飾的な画像
                  width={post.eyecatch.width}
                  height={post.eyecatch.height}
                  priority // 詳細ページでは priority を true にすることが多い
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
          <div
            className={styles.postContent}
            // --- 表示方法を選択 ---
            // 1. dangerouslySetInnerHTML (サニタイズなし)
            dangerouslySetInnerHTML={{ __html: post.content }}

            // 2. dangerouslySetInnerHTML (DOMPurify でサニタイズ)
            // dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          >
            {/* 3. html-react-parser を使う場合 */}
            {/* {reactContent} */}
          </div>

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