const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

const Item = require('./models/Item')

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error:', err))

// Routes
app.get('/items', async (req, res) => {
  const items = await Item.find()
  res.json(items)
})

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body)
  await newItem.save()
  res.json({ success: true, item: newItem })
})

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'))
