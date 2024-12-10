/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export',  // 静态导出
    basePath: '/safe-tx-analyzer',  // 添加这行，设置基础路径
    assetPrefix: '/safe-tx-analyzer/',  // 添加这行
    images: {
        unoptimized: true, // GitHub Pages 不支持 Next.js 的图片优化
    },
};

export default nextConfig;
