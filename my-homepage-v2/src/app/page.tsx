import Image from "next/image";
import styles from "./page.module.css";

export const metadata = { title: "chcolte.com / Top" };

export default function Home() {
  
  return (
      <div className={styles.container}>
        <article className={styles.contentArea}>
          <h1>Hello, NextJS!</h1>
          <p>hello, NextJS!</p>
          <p>現在、簡易運用中</p>
          <p style={{ marginTop: '20px' }}>
            <button className={styles.buttonPrimary}>サンプルボタン</button>
          </p>
        </article>
      </div>
  );
}
