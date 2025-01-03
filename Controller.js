const model = require('./Model');

// get api

const getdata = async (req, res) => {
    try {
        const data = await model.find()
        res.status(200).send({ data })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message : 'internal server error'})
    }
}

// post api

const add = async (req, res) => {
    const { ctitle, ctext } = req.body;
    try {
        const data = new model({
            ctitle, ctext
        });
        const userdata = await data.save()
        res.send({ userdata });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server error' })
    }
}

// Delete api

const deletedata = async (req, res) => {
    try {
        const data = await model.deleteOne({ _id: req.params.id })
        res.status(200).send({ data })
    } catch (error) {
        res.status(500).send(error)
    }
}

const putdata = async (req, res) => {
    const { ctitle, ctext } = req.body;
    try {
        const data = await model.updateOne(
            {
                _id: req.params._id
            },
            {
                $set:{
                    ctitle,
                    ctext
                }
            },
        );
        if(data) {
            res.status(200).send({ message : "Data Updated found" });
        } else {
            res.status(404).send({ message : "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message : "internal Server Error" });
    }
}



module.exports = { getdata, add, deletedata, putdata };