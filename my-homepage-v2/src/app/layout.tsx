"use client";

import { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from 'next/link';
import styles from "./page.module.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themes = ['theme-1a', 'theme-1b'];
  const defaultTheme = 'theme-1b'; // サーバーレンダリング時のデフォルト
  const [theme, setTheme] = useState<string>(defaultTheme);
  const [isMounted, setIsMounted] = useState(false); // マウント状態
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // マウント後に localStorage からテーマを読み込み、マウント状態を true にする
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const initialTheme = savedTheme && themes.includes(savedTheme) ? savedTheme : defaultTheme;
    setTheme(initialTheme); // 実際のテーマを state に反映
    setIsMounted(true); // マウント完了を通知
  }, []); // 初回マウント時にのみ実行

  // テーマが変更されたら localStorage を更新する
  useEffect(() => {
    // マウント後でなければ localStorage にアクセスしない
    if (isMounted) {
      localStorage.setItem('selectedTheme', theme);
    }
  }, [theme, isMounted]);

  // テーマ切り替えハンドラ
  const handleThemeToggle = () => {
    const newTheme = theme === 'theme-1a' ? 'theme-1b' : 'theme-1a';
    setTheme(newTheme);
  };

  // ロゴフィルター用の Effect (マウント後に実行)
  useEffect(() => {
    // マウント後でなければ DOM 操作しない
    if (isMounted) {
      const logoImage = document.querySelector(`.${styles.logo} img`) as HTMLImageElement;
      if (logoImage) {
        // 現在の body の computed style からフィルターを取得
        // body のクラスは isMounted && theme で決まるため、これでOK
        const currentFilter = getComputedStyle(document.body).getPropertyValue('--logo-filter');
        logoImage.style.filter = currentFilter;
      }
    }
  }, [theme, isMounted]); // theme または isMounted が変更されたら実行

  // body に適用するクラス名を決定
  // マウント前は defaultTheme、マウント後は実際の theme を使用
  const bodyClassName = `${isMounted ? theme : defaultTheme} ${inter.className}`;

  // テーマ切り替えボタンの表示内容を決定
  // マウント前はデフォルト、マウント後は実際のテーマに基づいて表示
  const currentThemeForButton = isMounted ? theme : defaultTheme;
  const buttonLabel = currentThemeForButton === 'theme-1a' ? "ダークモードに切り替え" : "ライトモードに切り替え";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // メニューの開閉に応じてbodyにクラスを追加/削除
    document.body.classList.toggle('menuOpen');
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menuOpen');
  };

  // メニューが開いている時に外部をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(`.${styles.mainNav}`);
      if (isMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
        document.body.classList.remove('menuOpen');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <html lang="ja">
      <head>
        <meta name="description" content="Chcolte's personal website" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="icon" href="/fabicon.png" type="image/png" sizes="any" />
      </head>
      {/* body のクラスは isMounted 状態を考慮して設定 */}
      {/* suppressHydrationWarning は念のため残しても良いが、不要になる可能性が高い */}
      <body className={bodyClassName} suppressHydrationWarning={true}>
        <header className={styles.siteHeader}>
          <div className={`${styles.container} ${styles.headerContainer}`}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <div className={styles.logo}>
                  <Image
                    src="/sitelogo.svg"
                    alt="Chcolate Logo"
                    width={100}
                    height={40}
                    priority
                  />
                </div>
              </div>
            </Link>
            <nav className={styles.mainNav}>
              <button 
                className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              >
                <span className="material-symbols-outlined">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
              <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ''}`}>
                <li><Link href="/about" onClick={handleMenuClick}>About</Link></li>
                <li><Link href="/blog" onClick={handleMenuClick}>Blog</Link></li>
                <li><Link href="/webtools" onClick={handleMenuClick}>WebTools</Link></li>
                <li><Link href="/credits" onClick={handleMenuClick}>Credits</Link></li>
                <li className={styles.themeSwitcher}>
                  <button
                    className={styles.themeToggleButton}
                    onClick={handleThemeToggle}
                    aria-label={buttonLabel}
                    title={buttonLabel}
                  >
                    <span className="material-symbols-outlined">
                      {isMounted ? (currentThemeForButton === themes[0] ? 'dark_mode' : 'light_mode') : 'settings_brightness'}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* children を main タグで囲み、クラスを付与 */}
        <main className={styles.siteMain}>
          {children}
        </main>

        {/* フッター */}
        <footer className={styles.siteFooter}>
          <div className={styles.container}>
            <p>&copy; Copyright 2025 Chcolte. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
