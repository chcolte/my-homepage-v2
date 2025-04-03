"use client"; // Client Component に変更

import { useState, useEffect } from 'react'; // useState, useEffect をインポート
import Link from 'next/link';
import Image from 'next/image'; // Image コンポーネントをインポート
import styles from "../page.module.css";

// 記事データの型定義を拡張
type Article = {
  id: string;
  title: string;
  publishedAt: string; // または Date 型
  eyecatchUrl?: string; // アイキャッチ画像のURL (オプショナル)
  author: string;       // 著者名
  tags: { name: string }[]; // タグの配列
};

// ダミーデータに新しい情報を追加
const dummyArticles: Article[] = [
  {
    id: 'first-post',
    title: '最初の投稿',
    publishedAt: '2024-01-01',
    eyecatchUrl: '/images/dummy-eyecatch-1.jpg', // ダミー画像パス (public/images/ に配置想定)
    author: 'Chocolatte',
    tags: [{ name: 'Next.js' }, { name: 'Tutorial' }]
  },
  {
    id: 'second-post',
    title: '2番目の投稿は少し長めのタイトルにしてみるテスト',
    publishedAt: '2024-01-15',
    // eyecatchUrl: undefined, // アイキャッチがない場合
    author: 'Chocolatte',
    tags: [{ name: 'CSS' }]
  },
  {
    id: 'third-post',
    title: 'タグなし記事',
    publishedAt: '2024-02-01',
    author: 'Chocolatte',
    tags: [] // タグがない記事
  },
  // 必要に応じて他のダミー記事を追加
];

// デフォルトのアイキャッチ画像パス
const defaultEyecatch = '/images/no-image.png'; // (public/images/ に配置想定)

// ページ名を定数として定義
const PAGE_NAME = "Blog";

export default function BlogListPage() {
  // 全記事からユニークなタグ名を取得
  const allTagNames = Array.from(new Set(dummyArticles.flatMap(article => article.tags.map(tag => tag.name))));

  // ステートの定義
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>(allTagNames); // 初期状態は全てのタグを選択
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(dummyArticles); // 初期状態は全ての記事

  // タグ選択ボタンのハンドラ
  const handleTagSelect = (tagName: string) => {
    setSelectedTagNames(prevSelected => {
      if (prevSelected.includes(tagName)) {
        // 既に選択されている場合は削除
        return prevSelected.filter(name => name !== tagName);
      } else {
        // 選択されていない場合は追加
        return [...prevSelected, tagName];
      }
    });
  };

  // selectedTagNames が変更されたら記事をフィルタリングする Effect
  useEffect(() => {
    if (selectedTagNames.length === 0) {
      // 選択中のタグがない場合は、タグを持たない記事のみ表示（または空にするなど仕様による）
      // ここではタグを持たない記事のみ表示する例
      setFilteredArticles(dummyArticles.filter(article => article.tags.length === 0));
      // もしタグが一つも選択されていない場合に全記事表示したい場合は以下のようにする
      // setFilteredArticles(dummyArticles);
    } else {
      // 選択中のタグが1つでもある場合
      const filtered = dummyArticles.filter(article =>
        // タグを持たない記事は常に表示 OR いずれかのタグが選択されている
        article.tags.length === 0 || article.tags.some(tag => selectedTagNames.includes(tag.name))
      );
      setFilteredArticles(filtered);
    }
  }, [selectedTagNames]); // selectedTagNames が変更された時のみ実行

  // タイトル設定用の useEffect を追加
  useEffect(() => {
    // 定数を使用してタイトルを設定
    document.title = `Chcolte.com / ${PAGE_NAME}`;
  }, []); // マウント時に一度だけ実行

  return (
    <main className={styles.siteMain}>
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{PAGE_NAME}</h1>
          <p>ブログ記事の一覧です。</p>

          {/* タグフィルターボタン */}
          <div className={styles.tagFilterContainer}>
            <p style={{ margin: '0 10px 0 0', fontWeight: 'bold' }}>タグ:</p>
            {allTagNames.map(tagName => (
              <button
                key={tagName}
                onClick={() => handleTagSelect(tagName)}
                className={`${styles.tagButton} ${selectedTagNames.includes(tagName) ? styles.tagButtonActive : styles.tagButtonInactive}`}
              >
                {tagName}
              </button>
            ))}
            {/* 全選択/全解除ボタンを追加する場合 */}
            {/* <button onClick={() => setSelectedTagNames(allTagNames)}>全て選択</button> */}
            {/* <button onClick={() => setSelectedTagNames([])}>全て解除</button> */}
          </div>

          {/* 記事リスト (filteredArticles を使用) */}
          <ul className={styles.blogList}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <li key={article.id} className={styles.blogListItem}>
                  <Link href={`/blog/${article.id}`} className={styles.articleCardLink}>
                    <div className={styles.articleCard}>
                      {/* アイキャッチ画像 */}
                      <div className={styles.articleImage}>
                        <Image
                          src={article.eyecatchUrl || defaultEyecatch}
                          alt="" // 装飾的な画像のためaltは空
                          width={320} // サンプルに合わせたサイズ (CSSで調整可能)
                          height={180} // アスペクト比 16:9 程度
                          style={{ objectFit: 'cover' }} // 画像をコンテナに合わせる
                        />
                      </div>
                      {/* 記事詳細 */}
                      <div className={styles.articleDescription}>
                        <h3>{article.title}</h3>
                        <div className={styles.articleMeta}>
                          {/* 著者 */}
                          <span className={styles.metaItem}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }}>edit</span>
                            {article.author}
                          </span>
                          {/* タグ */}
                          {article.tags.length > 0 && (
                            <span className={styles.metaItem}>
                              <span className="material-symbols-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }}>sell</span> {/* category アイコンの代わりに sell を使用 */}
                              {article.tags.map((tag, index) => (
                                <span key={index}>
                                  {tag.name}
                                  {index < article.tags.length - 1 && '/'} {/* 最後のタグ以外に / を表示 */}
                                </span>
                              ))}
                            </span>
                          )}
                          {/* 公開日 */}
                          <span className={styles.metaItem}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }}>calendar_month</span>
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p>該当する記事がありません。</p> // フィルタリング結果が0件の場合
            )}
          </ul>
        </article>
      </div>
    </main>
  );
} 