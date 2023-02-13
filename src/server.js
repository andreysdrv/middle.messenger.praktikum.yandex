const express = require('express')
const { PORT = 3000 } = process.env

const app = express()

app.use(express.static('dist'))

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту: ${PORT}!`)
})
