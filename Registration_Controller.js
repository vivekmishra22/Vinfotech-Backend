const model = require('./Registration_Model');

// post api 

const adduser = async (req, res) => {
    const { fname, email, mobile, address, city, gender, subject } = req.body;
    try {
        const data = new model({
            fname, email, mobile, address, city, gender, subject
        });
        const userdata = await data.save()
        res.send({ userdata });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server error' })
    }
}

const getuser = async (req, res) => {
    try {
        const data = await model.find()
        res.status(200).send({ data })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'internal server error' })
    }
}

const deleteuser = async (req, res) => {
    try {
        const data = await model.deleteOne({ _id: req.params.id })
        res.status(200).send({ data })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateuser = async (req, res) => {
    const { fname, email, mobile, address, city, gender, subject } = req.body;
    try {
        const data = await model.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    fname,
                    email,
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

module.exports = { adduser, getuser, deleteuser, updateuser };