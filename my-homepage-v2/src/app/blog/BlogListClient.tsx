"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "../page.module.css";
import type { Blog, Tag } from '../microcms_types'; // 型定義をインポート

// デフォルトのアイキャッチ画像パス
const defaultEyecatch = '/images/no-image.png'; // (public/images/ に配置想定)

type Props = {
  articles: Blog[];
  allTags: Tag[];
};

export default function BlogListClient({ articles, allTags }: Props) {
  // 全タグ名を取得 (props から)
  const allTagNames = allTags.map(tag => tag.name);

  // ステートの定義
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>(allTagNames); // 初期状態は全てのタグを選択
  const [filteredArticles, setFilteredArticles] = useState<Blog[]>(articles); // 初期状態は全ての記事 (props から)

  // タグ選択ボタンのハンドラ
  const handleTagSelect = (tagName: string) => {
    setSelectedTagNames(prevSelected => {
      if (prevSelected.includes(tagName)) {
        return prevSelected.filter(name => name !== tagName);
      } else {
        return [...prevSelected, tagName];
      }
    });
  };

  // selectedTagNames が変更されたら記事をフィルタリングする Effect
  useEffect(() => {
    if (selectedTagNames.length === 0) {
      // タグが一つも選択されていない場合は、タグを持たない記事のみ表示
      setFilteredArticles(articles.filter(article => article.tags.length === 0));
      // もしタグが一つも選択されていない場合に全記事表示したい場合は以下のようにする
      // setFilteredArticles(articles);
    } else {
      // 選択中のタグが1つでもある場合
      const filtered = articles.filter(article =>
        // タグを持たない記事は常に表示 OR いずれかのタグが選択されている
        article.tags.length === 0 || article.tags.some(tag => selectedTagNames.includes(tag.name))
      );
      setFilteredArticles(filtered);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTagNames, articles]); // articles も依存配列に追加 (props が変わった場合に対応)

  // 日付フォーマット関数 (必要に応じて調整)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP'); // 日本語ロケールで表示
  };

  return (
    <>
      {/* タグフィルターボタン */}
      <div className={styles.tagFilterContainer}>
        <p style={{ margin: '0 10px 0 0', fontWeight: 'bold' }}>タグ:</p>
        {allTags.map(tag => (
          <button
            key={tag.id}
            onClick={() => handleTagSelect(tag.name)}
            className={`${styles.tagButton} ${selectedTagNames.includes(tag.name) ? styles.tagButtonActive : styles.tagButtonInactive}`}
          >
            {tag.name}
          </button>
        ))}
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
                      // microCMS の eyecatch はオプショナルなので ?. を使う
                      src={article.eyecatch?.url || defaultEyecatch}
                      alt="" // 装飾的な画像のためaltは空
                      width={article.eyecatch?.width || 320} // microCMS の幅、なければデフォルト
                      height={article.eyecatch?.height || 180} // microCMS の高さ、なければデフォルト
                      style={{ objectFit: 'cover' }}
                      priority={false} // リスト表示では priority は false が一般的
                    />
                  </div>
                  {/* 記事詳細 */}
                  <div className={styles.articleDescription}>
                    <h3>{article.title}</h3>
                    <div className={styles.articleMeta}>
                      {/* 著者 */}
                      <span className={styles.metaItem}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }}>edit</span>
                        {/* microCMS の author を表示 */}
                        {article.author || 'Unknown Author'}
                      </span>
                      {/* タグ */}
                      {article.tags.length > 0 && (
                        <span className={styles.metaItem}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }}>sell</span>
                          {article.tags.map((tag, index) => (
                            <span key={tag.id}>
                              {tag.name}
                              {index < article.tags.length - 1 && '/'}
                            </span>
                          ))}
                        </span>
                      )}
                      {/* 公開日 */}
                      <span className={styles.metaItem}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }}>calendar_month</span>
                        {/* microCMS の publishedAt をフォーマットして表示 */}
                        {formatDate(article.publishedAt || article.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>該当する記事がありません。</p>
        )}
      </ul>
    </>
  );
} 