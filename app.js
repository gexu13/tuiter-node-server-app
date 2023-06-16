import express, { json } from "express";
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";



const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);




const app = express();

app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
      // origin: "https://a5--sparkling-gingersnap-3a0ae5.netlify.app",
    })
   );


app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
   );
   

app.use(express.json());



TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);


