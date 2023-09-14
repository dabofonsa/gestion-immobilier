import mongoose from "mongoose";

const connecTDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('Le serveur est connecté à la base de données MongoDB'))
        .catch((error) => console.log(error));
}

export default connecTDB;