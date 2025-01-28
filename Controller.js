const model = require('./Model');

// GET API (Fetch All Data)

const getdata = async (req, res) => {
    try {
        const data = await model.find()
        res.status(200).send({ data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : 'internal server error'})
    }
}

// const getdata = async (req, res) => {
//     try {
//         const data = await model.find();
//         if (!data.length) {
//             return res.status(404).json({ message: 'No records found' });
//         }
//         res.status(200).json({ data });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };


// GET API ONLY FIND ONE
const GetuserById = async (req, res) => {
    try {
        const { _id } = req.params
        const userData = await model.findOne({ _id: _id })
        res.status(200).send({ userData })

    } catch (err) {
        // res.status(400).send(err)
        console.log(err)
    }
}

// const GetuserById = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         if (!_id) {
//             return res.status(400).json({ message: 'ID is required' });
//         }
//         const userData = await model.findOne({ _id });
//         if (!userData) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ userData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// post api


const add = async (req, res) => {
    const { ctitle, ctext } = req.body;
    try {
        const data = new model({
            ctitle, ctext, 
            image:req.file.filename
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


// Update api

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
                    ctext,
                    image:req.file.filename
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



module.exports = { getdata, add, GetuserById, deletedata, putdata };