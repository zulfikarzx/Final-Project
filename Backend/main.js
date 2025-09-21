import express from 'express'
import mongoose from 'mongoose'
import categoryRoutes from './Routes/categoryRoutes.js';
import brandRoutes from './Routes/brandRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import sizeRoutes from './Routes/sizeRoutes.js';
import tempImageRoutes from './Routes/tempImageRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import displayRoutes from './Routes/displayRoute.js';
import orderRoutes from './Routes/orderRoutes.js';
import accountRoutes from './Routes/accountRoutes.js';
import AdminorderRoute from './Routes/AdminorderRoute.js';
import dashboardRoutes from './Routes/dashboardRoutes.js';


import cors from 'cors'
const app = express()
const port = 3000
 

app.use(cors({
  origin: "https://your-frontend.vercel.app",
  credentials: true
}));

app.use(express.static('public'))
const conn = mongoose.connect('mongodb://127.0.0.1:27017/shop')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/uploads', express.static('uploads'));


app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', categoryRoutes)
app.use('/api', brandRoutes);
app.use('/api', sizeRoutes);
app.use('/api', tempImageRoutes);
app.use('/api', productRoutes);
app.use('/api', displayRoutes);
app.use('/api', orderRoutes);
app.use('/api', accountRoutes);
app.use('/api', AdminorderRoute);
app.use('/api', dashboardRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
