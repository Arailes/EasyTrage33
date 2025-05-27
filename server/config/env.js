module.exports = {
    API_URL: '0.0.0.0:10000',
    DATABASE: 'mongodb://0.0.0.0:27017/easytrage',
    APP_PATH: __dirname + '/src/components/App',
    CONFIG_PATH: __dirname + '/src/components/App/config',
    HTTPS_KEY: __dirname + '/easytrage-key.pem',
    HTTPS_CERT: __dirname + '/easytrage-cert.pem'
}
