const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello world' })
})

const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
