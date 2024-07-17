const express = require('express');
const router = express.Router();
const Halls = require('./models/addhall');

//Inserting(Creating) Data:
router.post("/insertHall", async (req, res) => {
    const { name, location, phonenumber } = req.body;

    try {
        const Halls = await Halls.findOne({ name: name })
        console.log(Halls);

        if (Halls) {
            res.status(422).json("hall is already added.")
        }
        else {
            const addhall = new Halls({ name,location,phonenumber })

            await addhall.save();
            res.status(201).json(addhall)
            console.log(addhall)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/halls', async (req, res) => {

    try {
        const gethalls = await Halls.find({})
        console.log(gethalls);
        res.status(201).json(gethalls);
    }
    catch (err) {
        console.log(err);
    }
})


//Editing(Updating) Data:
router.put('/updatehall/:id', async (req, res) => {
    const { name, location, phonenumber } = req.body;

    try {
        const updatehall = await Halls.findByIdAndUpdate(req.params.id, { name, location, phonenumber }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updatehall);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deletehall/:id', async (req, res) => {

    try {
        const deletehall = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deletehall);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;