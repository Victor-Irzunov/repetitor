const nextConfig = {
	async rewrites() {
	  return [
		 {
			source: '/api/:path*',
			destination: '/api/:path*',
		 },
	  ];
	},
	async headers() {
		return [
		  {
			 source: '/(.*)',
			 headers: [
				{
				  key: 'Cache-Control',
				  value: 'public, s-maxage=3600, stale-while-revalidate=3600',
				},
			 ],
		  },
		];
	 },
 };
 module.exports = nextConfig;
 