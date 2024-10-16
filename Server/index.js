const express = require ("express")
const cors = require ("cors")
const notFound = require ("./Middleware/NotFound")
const errorHandler = require ("./Middleware/ErrorHandler")
const connectDB = require ("./ConnectDB/Connect")
require ("dotenv").config()
const app = express()
const path = require("path")


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.use(express.json())
app.use(errorHandler)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/auth", require ("./Routes/AuthRoute"))
app.use("/job", require ("./Routes/JobRoute"))
app.use("/apply", require ("./Routes/ApplyRoute"))
app.use("/order",require("./Routes/Order"))

app.use(notFound)
app.get("/getKey",(req,res)=>res.status(200).json({key:process.env.RAZORPAY_ID}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


const port = process.env.PORT || 8070
const startApp = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startApp();