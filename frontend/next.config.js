module.exports = {
    async redirects() {
        return [
            {
                source: '/user',
                destination: '/',
                permanent: true,
            },
            {
                source: '/suport',
                destination: '/',
                permanent: true,
            }
        ]
    },
    env: {
        ADM_EMAIL: process.env.ADM_EMAIL,
        ADM_PASSWORD: process.env.ADM_PASSWORD
    }

}