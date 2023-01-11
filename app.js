//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.set('strictQuery' , true);
mongoose.connect('mongodb://127.0.0.1:27017/BlogSite',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
  console.log("connected to database successsfully");
}).catch((error)=>{
  console.log(error);
});

// const array_method = require("./packages");

const blogSchema = mongoose.Schema({
  blog_title : String,
  blog_text : String
});

const BlogCollection = mongoose.model("BlogConnection" , blogSchema);

let posts = [];
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


app.get('/' , (req , res) => {

    BlogCollection.find({},(error , result)=>{
      if(!error){
        let me = "SELF";
        res.render("home" , {
          p1 : "FEEL FREE TO WRITE YOUR" + me,
          post_array : result 
        })
      }else{
        res.render("compose");
      }
    });
    
});


app.get('/about' , (req , res) => {
  res.render('about.ejs', {
    p2 : aboutContent, 
  });
});


app.get('/contact' , (req , res) => {
  res.render('contact.ejs', {
    p3 : contactContent, 
  });
});


app.get('/compose' , (req , res) => {
  res.render('compose.ejs',);
});


app.post('/' , (req ,res) => {

  
  if(req.body.blog_text === "")
      res.redirect('/compose');

  else{
      const blogDocument = new BlogCollection({
        blog_title : req.body.blog_title,
        blog_text : req.body.blog_text
      });
      
      blogDocument.save();
      res.redirect("/");
      }

      //res.redirect('/compose');

});

app.get('/posts/:post_id' , (req , res) => {
  
  const post_id = req.params.post_id ;
  //console.log(post_id);
  BlogCollection.findOne({ _id : post_id },(error , result)=>{
    if(!error){
      res.render("post" , {
        title : result.blog_title,
        content : result.blog_text
      });
    }else{
      res.redirect("/");
    }
  });

});




app.listen(3000, function() {
  console.log("your wishes are being completed by the universe!");
});
