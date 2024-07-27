import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './database/db.js';
import  { router,vpsMonthlyRouter, vpsSubscriber } from './routes/route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

const port = process.env.PORT || 8080

//.env file access
dotenv.config();

// database connection
dbConnection()
// Frontend and Backend Connection 
app.use(cors())



// Middleware
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())

// Routes
app.use('/api/v1/auth',router)
app.use('/api/v1/subscriptions',router)
app.use('/api/v1/monthlyPlan',router)
app.use('/api/v1/subscribers',router)
app.use('/api/v1/emailServices',router)
app.use('/api/v1/emailServiceMonthly',router)
app.use('/api/v1/emailSubscriber',router)
app.use('/api/v1/vpsHosting',router)
app.use('/api/v1/vpsHostingMonthly',vpsMonthlyRouter)
app.use('/api/v1/vpsSubscriber',vpsSubscriber)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});