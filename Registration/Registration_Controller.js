const model = require('./Registration_Model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;
const secret = 'mysecretkey';
const saltRounds = 10; // Number of salt rounds for bcrypt

// get api

const getuser = async (req, res) => {
    try {
        const data = await model.find()
        res.status(200).send({ data })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'internal server error' })
    }
}


// post api 
//post the user details for login
const reguser = async (req, res) => {
    const { fname, email, password, mobile, address, city, gender, subject } = req.body;
    try {
        // Check if user already exists
        const existingUser = await model.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await model.create({
            fname,
             email, 
             password: hashedPassword, 
             mobile, 
             address, 
             city, 
             gender, 
             subject
        });

        // Generate JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, { expiresIn: '1h' });

        return res.status(201).json({ user: newUser, token });

    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



// POST API for user login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await model.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the hashed password with the provided password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '1h' });

        return res.json({ email: user.email, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// const adduser = async (req, res) => {
//     const { fname, email, password, mobile, address, city, gender, subject } = req.body;
//     try {
//         const data = new model({
//             fname, email, password, mobile, address, city, gender, subject
//         });
//         const userdata = await data.save()
//         res.send({ userdata });
//     }
//     catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: 'internal server error' })
//     }
// }

// Delete api

const deleteuser = async (req, res) => {
    try {
        const data = await model.deleteOne({ _id: req.params.id })
        res.status(200).send({ data })
    } catch (error) {
        res.status(500).send(error)
    }
}

// Update api

const updateuser = async (req, res) => {
    const { fname, email, password, mobile, address, city, gender, subject } = req.body;
    try {
        const data = await model.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    fname,
                    email,
                    password,
                    mobile,
                    address,
                    city,
                    gender,
                    subject
                },
            }
        );

        if (data) {
            res.status(200).send({ message: "User updated found" });
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "internal server error" });
    }
}


module.exports = { getuser, deleteuser, updateuser, reguser, login };   // adduser