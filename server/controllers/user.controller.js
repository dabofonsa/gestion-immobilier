import User from '../mongodb/models/user.js';

// fonction pour afficher tous les utilisateus
const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ message: "Il n'y a pas d'utilisateurs" });
    }
};

// fonction pour créer un utilisateur
const createUser = async(req, res) => {
    try {
        const { name, email, avatar } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await User.create({
            name,
            email,
            avatar,
        });
        res.status(200).json(newUser);
        // res.status(200).json({message: "utilisateur enregistré avec succès"});
    } catch (error) {
        res.status(500).json({ message: "Erruer de création de l'utilisateur" });
    }
};

// fonction pour afficher un utilisateur par son identifiant
const getUserInfoByID = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        //res.status(500).json({ message: error.message });
        res.status(500).json({ message: "Cet identifiant utilisateur n'existe pas" });
    }
};

export {
    getAllUsers,
    createUser,
    getUserInfoByID,
}