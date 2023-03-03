const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth-route');
const postRoute = require('./routes/post-route');
const userRoute = require('./routes/user-route');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
dotenv.config();
mongoose.set('strictQuery', true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL) 
        console.log('Connected to MongoDB!')       
    } catch (error) {
        console.log(error)
    }
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage);
});


app.listen(9999, () => {
    connect();
    console.log("Backend server is running!");
})