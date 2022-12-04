//Initialise Express App...
const Express = require('express');
const app = Express();
const path = require('path');
const hbs = require('hbs');

//db
require("./database/databaseConn")

//Connections :
const Host = "127.0.0.1";
const Port = 8800;

//Creating paths-
const publicFolderPath = path.join(__dirname, "../public")
const pertialFolderPath = path.join(__dirname, "../server/views/partials")

//Built-in middleware to read all file formats...
app.use(Express.static(publicFolderPath));

// Set Tamplate engine
app.set('view engine', 'hbs')

// Set Partials
hbs.registerPartials(pertialFolderPath)

//Creating Server.............................................
//Home page
app.get("/", (req, res)=>{
    res.render("index")
})
//Student Login...
app.get("/Student-login", (req, res) => {
    res.render("login")
})
//New registration...
app.get('/Registration', (req, res)=>{
    res.render('registration')
})
//About...
app.get('/Registration', (req, res)=>{
    res.send('This is about page yet to be ready')
})
//Main page...
app.get('/Main', (req, res)=>{
    res.render('main')
})
//Order page...
app.get('/yourOrders', (req, res)=>{
    res.render('orderPage')
})
//Reciept page...
app.get("/reciept", (req, res)=>{
    res.render("reciept")
})
//Error 404
app.get("*", (req, res) => {
    res.status(404).send("404")
})



//Listing Server...
app.listen(Port, () => {
    console.log(`\n Listing to port :${Port} & Hosted in : Localhost || Click here: ${Host}:${Port}`)
})