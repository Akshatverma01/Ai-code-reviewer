import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config()

// Starting the server om port 3000
const port = process.env.PORT ;
app.listen(port, ()=>console.log(`Server is running on ${port}`)) 