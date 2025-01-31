// Import the model (from the Model.js file) which is used to interact with the database.
const model = require('./Model');   

// GET API ( fetch all data from the database )
const getdata = async (req, res) => {
    try {

        // Fetch all records from the database using the 'find' method, await keyword wait util promises resolved or reject
        const data = await model.find()  
        // Send the fetched data as a response with a 200 status code
        res.status(200).send({ data })  

    } catch (error) {

        // Log the error to the console for debugging
        console.log(error);     
        // If an error occurs during saving, log it and send a 500 internal server error response
        // Send a 500 status code with an error message if something goes wrong, 
        return res.status(500).json({ message: 'internal server error' })       

    }
}


// GET API ONLY FIND ONE ( fetch a one user's data based on the user ID )
const GetuserById = async (req, res) => {
    try {

        // Extract the `_id` parameter from the request URL
        const { _id } = req.params
        // Fetch user data from the database by matching the '_id'
        const userData = await model.findOne({ _id: _id })
        // Send the fetched document as a response with a 200 status code
        res.status(200).send({ userData })

    } catch (err) {
        console.log(err)
    }
}


// POST API (Add New Data)

const add = async (req, res) => {

    // Extract `ctitle` and `ctext` from the request body
    const { ctitle, ctext } = req.body;
    
    try {

        // Create a new document using the Mongoose model
        const data = new model({
            ctitle, ctext,
            // Extract the filename of the uploaded file, this stores the filename of the uploaded image
            image: req.file.filename        
        });

        // Save the new document to the MongoDB collection
        const userdata = await data.save()
        // Send the saved document as a response
        res.send({ userdata });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server error' })
    }
}

// DELETE API (Delete Data by ID)

const deletedata = async (req, res) => {
    try {
        
        // Use the ID from the URL params(parameters) to Delete a document from the database
        const data = await model.deleteOne({ _id: req.params.id })
        // Send the deletion result as a response with a 200 status code
        res.status(200).send({ data })
    } catch (error) {
        // If an error occurs, send back a 500 error response
        res.status(500).send(error)
    }
}


// PUT API (Update Data by ID)

const putdata = async (req, res) => {

    // Extract `ctitle` and `ctext` from the request body
    const { ctitle, ctext } = req.body;
    try {

        // Update a document in the collection by matching its ID (`_id`) from the request parameters(from the URL params)
        const data = await model.updateOne(

            { _id: req.params._id },            // Find the course by its '_id'
            {
                $set: {
                    ctitle,                     // Update `ctitle`
                    ctext,                      // Update `ctext`
                    image: req.file.filename    // Update `image` with the new filename
                }
            },
        );
        if (data) {
            // If the document is updated, send a success message
            res.status(200).send({ message: "Data Updated found" });
        } else {
            // If no document is found, send a 404 status code with a message
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {

        // Log the error to the console for debugging
        console.log(error);
        // Send a 404 status code with an error message ("internal Server Error")
        res.status(404).send({ message: "internal Server Error" });
    }
}

// Export all the functions(API handler functions) to be used in other files, 
module.exports = { getdata, add, GetuserById, deletedata, putdata };