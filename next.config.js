/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async redirects() {
		return [
			{
				source: "/",
				destination: "/group_A",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
