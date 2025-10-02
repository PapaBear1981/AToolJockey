import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

const config = withPWA({
  dest: 'public',
  disable: isDev,
})({
  experimental: {
    ppr: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }, { protocol: 'http', hostname: '**' }],
  },
});

export default config;
