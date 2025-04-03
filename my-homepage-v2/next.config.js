/** @type {import('next').NextConfig} */
const nextConfig = {
  // 他の設定があればここに記述...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      // 他に許可したいホスト名があればここに追加
    ],

  },

};

module.exports = nextConfig;
