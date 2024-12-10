/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export',  // 静态导出
    distDir: 'build', // 将 .next 改为 build
    basePath: '/analysis',  // 添加这行，设置基础路径
    assetPrefix: '/analysis/',  // 添加这行，设置资源前缀
};

export default nextConfig;
