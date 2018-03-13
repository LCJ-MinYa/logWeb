export default {
	API: process.env.NODE_ENV == 'production' ? 'https://api.ziyiu.com/life' : 'http://127.0.0.1:8084/life',
}