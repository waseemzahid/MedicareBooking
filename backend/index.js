// import express from 'express'
//  import cookieParser from 'cookie-parser'
//  import cors from 'cors'
//  import mongoose from 'mongoose'
//  import dotenv from 'dotenv'
//  import authRoute from './Routes/auth.js'
//  import userRoute from './Routes/user.js'
//  import doctorRoute from './Routes/doctor.js'
//  import reviewRoute from './Routes/review.js'
//  import bookingRoute from './Routes/booking.js'

//  dotenv.config()

//  const app = express()
//  const port = process.env.port || 3000

// //  const corsOptions = {
// //     origin: true
// //  }
// const corsOptions = {
//    origin: 'https://medicare-booking-frontend.vercel.app',
//    optionsSuccessStatus: 200
// };

//  app.get('/', (req, res) =>{
//     res.send("Api is working")
//  })

//  //Database Connection
//  mongoose.set('strictQuery', false)
//  const connectDB = async() => {
//    try {
//       // await mongoose.connect(process.env.MONGO_URL, {
//       //    useNewUrlParser: true,
//       //    useUnifiedTopology: true,
//       // })
//       await mongoose.connect(process.env.MONGO_URL)
//       console.log("MongoDB Database Connected");
//    } catch (err) {
//       console.log("MongoDB Database Connection Failed");
//    }
//  }
//  //middleware
//  app.use(express.json());
//  app.use(cookieParser());
//  app.use(cors(corsOptions));
//  app.use('/api/v1/auth', authRoute)
//  app.use('/api/v1/users', userRoute)
//  app.use('/api/v1/doctors', doctorRoute)
//  app.use('/api/v1/reviews', reviewRoute)
//  app.use('/api/v1/bookings', bookingRoute)

//  app.listen(port, () =>{
//     connectDB();
//     console.log(`Server is running on port ${port}`);
//  })

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;  // Corrected 'port' to 'PORT'

// Database Connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,  // If using a driver version < 4.x, these are recommended
            useUnifiedTopology: true
        });
        console.log("MongoDB Database Connected");
    } catch (err) {
        console.log("MongoDB Database Connection Failed", err);
    }
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://medicare-booking-frontend.vercel.app', // Ensure this is exactly your frontend's URL
    optionsSuccessStatus: 200
}));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);

app.get('/', (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});