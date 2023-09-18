import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connecTDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();


app.use(cors({
    origin: ["http://localhost:3000", "https://gestion-immobilier.netlify.app/"]
}));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
})

// appel des Midlewares
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const PORT = process.env.PORT || 5008
const MONGODB_URL = 'mongodb+srv://fonsadabo:f4121994&MFD@cluster0.23uwgzf.mongodb.net/?retryWrites=true&w=majority';


const startServer = async() => {
    try {
        connecTDB(process.env.MONGODB_URL);

        app.listen(8080, () =>
            console.log(`Serveur démarré sur le port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

startServer();
