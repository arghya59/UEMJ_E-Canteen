const express = require("express")
const async = require("hbs/lib/async")
const Router = new express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
//Models import
const userSchema = require("../models/users")
//Middleware
//const auth = require("../middleware/auth")

//POST requiests...

// // ### Register user ### // //
Router.post("/User/Register", async (req, res) => {
    try{
        const username = req.body.username
        const userEnrollment = req.body.userEnrollment
        const phone = req.body.contactNo
        const Email = req.body.userEmail
        const userBlock = req.body.userBlock
        const userRoom = req.body.userRoom
        const password = req.body.password
    }
    catch(e){
        console.log(e)
    }
})


// Export the page
module.exports = Router