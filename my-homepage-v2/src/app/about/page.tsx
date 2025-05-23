import styles from "../page.module.css";
import aboutStyles from './about.module.css';
import Image from 'next/image';
import { Metadata } from 'next';

const PAGE_NAME = "About";
export const metadata: Metadata = {
  title: `Chcolte.com / ${PAGE_NAME}`,
  description: 'サイト管理者の紹介ページです。',
};

export default function AboutPage() {

  return (
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>{PAGE_NAME}</h1>
          <div className={styles.titleSeparator}></div>
          <div className={aboutStyles.aboutContainer}>
          <section className={aboutStyles.profileSection}>
            <div className={aboutStyles.profileImageContainer}>
              <Image
                src='/chcolte_Logo.png'
                alt={`chcolteのプロフィール写真`}
                width={150}
                height={150}
                className={aboutStyles.profileImage}
                priority
              />
            </div>
            <div className={aboutStyles.profileDetails}>
              <h1 className={aboutStyles.nickname}>chcolte</h1>
              <p className={aboutStyles.bio}>chcolteです。サーバーやネットワークについて最近は学んでいます！</p>
            </div>
          </section>

          <section className={aboutStyles.otherSections}>
            <div className={aboutStyles.section}>
              <h2 className={aboutStyles.sectionTitle}>スキル / 資格</h2>
              <ul className={aboutStyles.list}>
                <li key="0" className={aboutStyles.listItem}>TOEIC L&R 805点</li>
                <li key="1" className={aboutStyles.listItem}>Dart/Flutterを用いた，Androidアプリケーションの開発主導経験</li>
                <li key="2" className={aboutStyles.listItem}>JavaScript, TypeScript使用経験</li>
              </ul>
            </div>


            <div className={aboutStyles.section}>
              <h2 className={aboutStyles.sectionTitle}>趣味</h2>
              <ul className={aboutStyles.list}>
                <li key="0" className={aboutStyles.listItem}>プログラミング</li>
                <li key="1" className={aboutStyles.listItem}>ゲーム(KSP, Cities:Skylines等)</li>
              </ul>
            </div>

            <div className={aboutStyles.section}>
              <h2 className={aboutStyles.sectionTitle}>SNS / Links</h2>
              <ul className={aboutStyles.list}>
                <li key="0" className={aboutStyles.listItem}>
                  <a href="https://chcolte.com" target="_blank" rel="noopener noreferrer">本サイト</a>
                </li>
                <li key="1" className={aboutStyles.listItem}>
                    <a href="https://github.com/chcolte" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li key="2" className={aboutStyles.listItem}>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
              </ul>
            </div>
            
            <div className={aboutStyles.section}>
              <h2 className={aboutStyles.sectionTitle}>Contact</h2>
              <ul className={aboutStyles.list}>
                <li key="0" className={aboutStyles.listItem}>本サイトに関してのお問い合わせは次のアドレスへお願いいたします。</li>
                <li key="1" className={aboutStyles.listItem}>&quot;ここにメアド&quot;@chcolte.com</li>
              </ul>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

