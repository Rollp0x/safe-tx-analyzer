/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export',  // 静态导出
    distDir: 'build', // 将 .next 改为 build
    basePath: '/safe-tx-analyzer',  // 添加这行，设置基础路径
    images: {
        unoptimized: true, // GitHub Pages 不支持 Next.js 的图片优化
    },
};

export default nextConfig;
