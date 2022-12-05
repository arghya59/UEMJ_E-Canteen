const express = require("express")
const async = require("hbs/lib/async")
const Router = new express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
//Models import
const userSchema = require("../models/users")
//Middleware
const auth = require("../middleware/auth")

//POST requiests...

// // ### Register user ### // //
Router.post("/User/Register", async (req, res) => {
    try {
        console.log(req.body.username)
        const username = req.body.username
        const userEnrollment = req.body.userEnrollment
        const phone = req.body.contactNo
        const Email = req.body.userEmail
        const userBlock = req.body.userBlock
        const userRoom = req.body.userRoom
        const password = req.body.password

        //Algorithm for registration...
        const registerData = new userSchema({
            username: username,
            enrollmentNo: userEnrollment,
            userEmail: Email,
            contactNo: phone,
            blockName: userBlock,
            roomNo: userRoom,
            password: password
        })

        //Creating token for the particuler user
        const token = await registerData.generateAuthToken()
        console.log(token)

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000000)
        })

        //Sava the data in database
        const userData = await registerData.save()
        res.redirect("/Student-login")  

    }
    catch (e) {
        console.log(e)
    }
})

// // ### Login user ### // //

Router.post("/user/login", async (req, res) => {
    //Algorithm implementation for login
    try {
        const Enroll = req.body.loginUserName
        const password = req.body.LogInpassword
        //Fetch data froom database
        const fechedData = await userSchema.find({ enrollmentNo: Enroll })
        console.log(fechedData)
        //Checking data is available or no (user exists or not)
        if (fechedData.length < 1) {
            throw new Error("User doesn't exist")
        }
        //password checking...
        bcrypt.compare(password, fechedData[0].password, async function (err, result) {
            // result == true
            if (!result) {
                throw new Error("Wrong Credential")
            }
            //Authentication by JWT(JSON web token)
            if (result) {
                //Generating token
                const token = await jwt.sign({
                username: fechedData[0].username,
                userEmail: fechedData[0].userEmail,
                _id: fechedData[0]._id
                },
                    "uemcanteenusers",
                    {
                        expiresIn: "24h"
                    }
                )
                //COOKIES
                res.cookie("jwtLOGIN", token, {
                    expires: new Date(Date.now() + 300000000)
                })
                //Response
                res.redirect("/Main")
            }
        });
    } catch (error) {
        console.log(error)
    }
})






// Export the page
module.exports = Router