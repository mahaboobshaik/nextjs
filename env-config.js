const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://mahaboobbasha.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://mahaboobbasha.herokuapp.com',
    'process.env.CLIENT_ID': '7NRcfteyB8NkNgooxYr0VDxKZ1sV3sp0'
}