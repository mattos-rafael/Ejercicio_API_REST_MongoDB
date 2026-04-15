const express = require('express')
const app = express()
const PORT = 3000

const productRoutes = require('./routes/products.routes')
const providerRoutes = require('./routes/providers.routes')

app.use(express.json())

app.use('/api', productRoutes)
app.use('/api', providerRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  
})