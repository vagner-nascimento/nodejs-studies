const http = require('http')

http.createServer((require, response) => {
    response.end('Pure http Node api is UP!!')
})
.listen(5000, () => console.log('Api is running at port: 5000'))