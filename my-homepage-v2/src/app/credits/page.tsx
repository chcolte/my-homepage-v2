import { Metadata } from 'next';
import styles from "../page.module.css";

// ページ名を定数として定義
const PAGE_NAME = "Credits";

// メタデータを設定
export const metadata: Metadata = {
  title: `Chcolte.com / ${PAGE_NAME}`,
  description: 'このサイトで使用している技術やライブラリのクレジット表記です。',
};

export default function CreditsPage() {
  return (
    // layout.tsx で main があるので div から開始
    <div className={styles.container}>
      <article className={styles.contentArea}>
        <h1>{PAGE_NAME}</h1>
        <p>このウェブサイトは，以下のライブラリ/リソースを用いて作成されています。</p>
        <div className={styles.titleSeparator}></div>        

        <h4>主な使用ライブラリ</h4>
        <ul>
          <li><a href="https://www.npmjs.com/package/html-react-parser?activeTab=readme" target="_blank" rel="noopener noreferrer">html-react-parser (v5.2.3)</a> - MIT Lisence</li>
          <li><a href="https://www.npmjs.com/package/isomorphic-dompurify" target="_blank" rel="noopener noreferrer">isomorphic-dompurify (v2.22.0)</a> - MIT Lisence</li>
          <li><a href="https://www.npmjs.com/package/microcms-js-sdk" target="_blank" rel="noopener noreferrer">microcms-js-sdk (v3.2.0)</a> - Apache Lisence 2.0</li>
          <li><a href="https://www.npmjs.com/package/next" target="_blank" rel="noopener noreferrer">next (v15.2.4)</a> - MIT Lisence</li>
          <li><a href="https://www.npmjs.com/package/react" target="_blank" rel="noopener noreferrer">react (v19.0.0)</a> - MIT Lisence</li>
          <li><a href="https://www.npmjs.com/package/react-dom" target="_blank" rel="noopener noreferrer">react-dom (v19.0.0)</a> - MIT Lisence</li>
        </ul>

        <h4>使用サービス</h4>
        <ul>
          <li><a href="https://microcms.io/" target="_blank" rel="noopener noreferrer">microCMS</a></li>
          <li><a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Google Fonts</a></li>
        </ul>

        <h4>その他</h4>
        <ul>
          <li></li>
        </ul>
      </article>
    </div>
  );
} 