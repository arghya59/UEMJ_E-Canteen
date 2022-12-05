const async = require("hbs/lib/async")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require('validator')
const jwt = require('jsonwebtoken')


// Creating schema for users
const users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 25
    },
    enrollmentNo: {
        type: String,
        required: true,
        unique: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    contactNo: {
        type: String,
        unique: true,
        maxlength:10,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Phone is invalid")
            }
        }
    },
    blockName: {
        type: String,
        required: true,
    },
    roomNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    token:[{
        token:{
            type:String,
            required:true
        }
    }]
})

//Token to register in database after user registration...

users.methods.generateAuthToken = async function(){
    try {
        console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()}, "uemcanteenusers")
        console.log(token)
        this.token = this.token.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
}


//using Middleware performing hashing...
users.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 4)
        next()
    }
})

//Initialise the module...
const RegisterUser = new mongoose.model("RegisterUser", users)

//Export
module.exports = RegisterUser