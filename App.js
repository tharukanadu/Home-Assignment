const express = require('express')
const app = express()
const customer=require('./Routers/customer')
const item=require('./Routers/item')
const port = 5000

app.use(express.json())

app.use('/customer',customer)
app.use('/item',item)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});