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
        <p>このウェブサイトは、以下の素晴らしい技術やライブラリ、サービスを利用して構築されています。開発者およびコミュニティに感謝します。</p>

        <h2>主要技術・フレームワーク</h2>
        <ul>
          <li>
            <strong>Next.js:</strong> React フレームワーク (<a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">公式サイト</a>) - ライセンス: MIT
          </li>
          <li>
            <strong>React:</strong> UI ライブラリ (<a href="https://react.dev/" target="_blank" rel="noopener noreferrer">公式サイト</a>) - ライセンス: MIT
          </li>
          <li>
            <strong>TypeScript:</strong> プログラミング言語 (<a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">公式サイト</a>) - ライセンス: Apache 2.0
          </li>
        </ul>

        <h2>主なライブラリ</h2>
        <ul>
          <li>
            <strong>microCMS Client (microcms-js-sdk):</strong> microCMS API クライアント (<a href="https://github.com/microcmsio/microcms-js-sdk" target="_blank" rel="noopener noreferrer">GitHub</a>) - ライセンス: Apache 2.0
          </li>
          <li>
            <strong>html-react-parser:</strong> HTML 文字列を React 要素に変換 (<a href="https://github.com/remarkablemark/html-react-parser" target="_blank" rel="noopener noreferrer">GitHub</a>) - ライセンス: MIT
          </li>
          <li>
            <strong>isomorphic-dompurify:</strong> HTML サニタイザ (<a href="https://github.com/kkomelin/isomorphic-dompurify" target="_blank" rel="noopener noreferrer">GitHub</a>) - ライセンス: MIT / Apache 2.0 / MPL 2.0 (DOMPurify に依存)
          </li>
          {/* 他に使用しているライブラリがあれば追記 */}
          {/* 例:
          <li>
            <strong>date-fns:</strong> 日付操作ライブラリ (<a href="https://date-fns.org/" target="_blank" rel="noopener noreferrer">公式サイト</a>) - ライセンス: MIT
          </li>
          */}
        </ul>

        <h2>サービス</h2>
        <ul>
          <li>
            <strong>microCMS:</strong> Headless CMS (<a href="https://microcms.io/" target="_blank" rel="noopener noreferrer">公式サイト</a>)
          </li>
          <li>
            <strong>Vercel:</strong> ホスティングプラットフォーム (<a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>)
          </li>
          <li>
            <strong>Google Fonts:</strong> ウェブフォント (Material Symbols Outlined) (<a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>)
          </li>
        </ul>

        <h2>その他</h2>
        <ul>
          <li>サイトロゴやアイコンなどのアセットに関する情報（もしあれば）</li>
        </ul>

        <p style={{ marginTop: '30px', fontSize: '0.9em', opacity: 0.8 }}>
          各ライブラリやサービスのライセンス詳細は、それぞれの公式サイトやリポジトリをご確認ください。
        </p>
      </article>
    </div>
  );
} 