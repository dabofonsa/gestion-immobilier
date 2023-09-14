import mongoose from 'mongoose';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// afficher toutes les propriétés
const getAllProperties = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        propertyType = ""
    } = req.query;

    const query = {};

    if (propertyType !== "") {
        query.propertyType = propertyType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Property.countDocuments({ query });

        const properties = await Property.find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de rechargement des propriétés " });
    }
};

// afficher les détails d'une propriété
const getPropertyDetail = async (req, res) => {
    const { id } = req.params;
    const propertyExists = await Property.findOne({ _id: id }).populate(
        "creator",
    );

    if (propertyExists) {
        res.status(200).json(propertyExists);
    } else {
        res.status(404).json({ message: "La propriété n'existe pas" });
    }
};

// créer une propriete
const createProperty = async(req, res) => {
    try {
        const {
            title,
            description,
            propertyType,
            location,
            price,
            photo,
            email
        } = req.body;

        // démarer une nouvelle session
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("Utilisateur non trouvé");

        // uploader la photo
        const photoUrl = await cloudinary.uploader.upload(photo);

        //creer une nouvelle propriete
        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id
        });

        // mise a jour des propriétés créées par un utilisateur quelconque
        user.allProperties.push(newProperty._id);
        await user.save({ session }); // to save the new session

        //pour dire qu'on a fini cette session
        await session.commitTransaction();

        res.status(200).json({ message: "Création de la propriété effectuée avec succès" });

    } catch (error) {
        res.status(500).json({ message: "Erreur de création d'une nouvelle propriété" });
    }

};

// mettre a jour une propriete
const updateProperty = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description, propertyType, location, price, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate({ _id: id }, {
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url || photo,
        });

        res.status(200).json({ message: "Mise a jour de la Propriété effectuée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// supprimer une propriete
const deleteProperty = async(req, res) => {
    try {
        const { id } = req.params;

        const propertyToDelete = await Property.findById({ _id: id }).populate("creator");

        if (!propertyToDelete) throw new Error("Propriété à supprimer n'existe pas");

        const session = await mongoose.startSession();
        session.startTransaction();

        propertyToDelete.remove({ session });
        propertyToDelete.creator.allProperties.pull(propertyToDelete);

        await propertyToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Suppresion de la Propriété effectuée" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppresion du propriété" });
    }
};


export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty,
};