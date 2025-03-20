import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config()

// Starting the server om port 3000
app.listen(3000, ()=>console.log("Server is running on 3000")) 