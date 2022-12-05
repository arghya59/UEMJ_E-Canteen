const async = require("hbs/lib/async")
const jwt = require('jsonwebtoken')
const usersModelSchema = require("../models/users")

const Authentication = async (req, res, next) => {

    try {
        const login_cookie_token = req.cookies.jwtLOGIN
       // console.log(login_cookie_token)
        const varifyUser = await jwt.verify(login_cookie_token, "uemcanteenusers")
        //console.log("Hiiiiiiiiiiii",varifyUser._id)
        const user = await usersModelSchema.findOne({_id:varifyUser._id})
        req.token = login_cookie_token
        req.user = user

        next()
        return varifyUser   
    } catch (error) {
         console.log("User Authentication Failed:",error)
        res.render("login")
    }

}

module.exports = Authentication