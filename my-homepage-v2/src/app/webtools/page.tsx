import styles from "../page.module.css";
import { Metadata } from 'next';

const PAGE_NAME = "WebTools";
export const metadata: Metadata = {
  title: `Chcolte.com / ${PAGE_NAME}`,
  description: 'webToolsページです。',
};

export default function WebToolsPage() {

  return (
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{PAGE_NAME}</h1>
          <p>便利なWebツールを公開しています。</p>
          {/* 他のコンテンツ */}
        </article>
      </div>
  );
} 