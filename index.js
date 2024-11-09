import dotenv from "dotenv"
import connectDB from "./src/DB_Connection/index.js"
import {app} from "./app.js"


//set up dotenv to get access of env file
dotenv.config({
    path: './.env'
});


const startServer = async () => {
    try {
      await connectDB();
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.log("MONGO db connection failed !!! ", err);
    }
  };
  
startServer();
  