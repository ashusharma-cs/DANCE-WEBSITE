const express = require('express');
const path = require('path');
const bp = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newdance', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();


// middleware
app.use(express.urlencoded());

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String
  });

const Contact = mongoose.model('Contact', contactSchema);


// static directory
app.use("/static", express.static("static"));

// SETTING TEMPLATE
app.set('view engine', 'pug')
app.set("views", path.join(__dirname,"views"));

app.get("/", (req, res)=>{
    res.render("index.pug");
})
app.get("/contact", (req, res)=>{
    res.render("contact.pug");
})

app.post("/contact", (req, res)=>{
    console.log(req.body)
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("ok");
    }).catch(()=>{
        res.send("not saved");
    })
})
// LISTEN TO SERVER
app.listen(3000);
