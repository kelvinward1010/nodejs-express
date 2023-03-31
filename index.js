const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth-route');
const postRoute = require('./routes/post-route');
const userRoute = require('./routes/user-route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();
dotenv.config();
mongoose.set('strictQuery', true);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static('images'));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL) 
        console.log('Connected to MongoDB!')       
    } catch (error) {
        console.log(error)
    }
}

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'images')
    },
    filename:(req,file,cb) => {
        cb(null, req.body.name)
    }
})

app.use('images', express.static(path.join(__dirname, "/images")));

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res, next)=> {
    res.status(200).json("File has been upload")
})

app.use('/api/auth',  authRoute);
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