
const express =require('express');
const { mongo, Mongoose } = require('mongoose');
const app= express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fetch = require("node-fetch");
const fs = require('fs');


mongoose.connect("mongodb://localhost:27017/mydb",{ useCreateIndex: true,useNewUrlParser: true , useUnifiedTopology: true })
.then( ()=> console.log("connected to db..."))
.catch((err)=> console.log(err)) ;

//*********** question-2***************
function fun(url){
  fetch(url)
  .then(result => {
      //  console.log(result);
      
      return result.json();

   })
    .then(data => {
      //console.log(JSON.stringify(data));
      fs.appendFile('message.txt', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
   })
   .catch(error => {
       console.log(error);
   });
}
fun('https://data.ct.gov/api/views/rybz-nyjw/rows.json?accessType=DOWNLOAD');
fun('https://api.github.com/users/mralexgray/repos');
fun('https://data.townofcary.org/api/v2/catalog/datasets/rdu-weather-history');

//*************************************************************** *





app.get('/',(req,res)=>{
    res.send("hello world !!!");
})





















const port= process.env.NODE_ENV==='production' ? (process.env.PORT || 80) :4000;

const server = http.listen(port,()=>{
    console.log("server started listening on",port);
})