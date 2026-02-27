const express = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4} = require("uuid");
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use("/public" , express.static(path.join(__dirname , "public")));

//posts data
let posts = [{
    id: uuidv4(),
    name: "SumitKumar", 
    content: "Live life peacefully "
},{
    id: uuidv4(),
    name: "RoshniKumari", 
    content: "No comments .. "
},{
    id: uuidv4(),
    name: "ShannNandi", 
    content: "MHA is one of the best anime from new generation ."
}];

//home page
app.get("/" , (req ,res)=>{
 res.render("welcome.ejs");
});

//view posts
app.get("/posts" , (req,res)=>{
 res.render("index.ejs" , {posts});
});

//create new posts
app.get("/posts/new" , (req , res)=>{
res.render("new.ejs");
});

//post req for create new posts
app.post("/posts" , (req , res)=>{
let {name , content} = req.body;
let id = uuidv4();
posts.push({id, name , content});
res.redirect("/posts");
});

//show individual posts
app.get("/posts/:id", (req, res)=>{
let {id} = req.params;
let post = posts.find((p)=>id === p.id);
res.render("show.ejs" , {post});
});

//edit route
app.patch("/posts/:id",(req,res)=>{
let {id} = req.params;
let newContent = req.body.content; 
let post = posts.find((p)=>id===p.id);
post.content = newContent;
res.redirect("/posts")
});

//edit page
app.get("/posts/:id/edit",(req,res)=>{
let {id} = req.params;
let post = posts.find((p)=>id===p.id);
res.render("edit.ejs",{post});
});

//delete route
app.delete("/posts/:id" , (req ,res)=>{
let {id} = req.params;
posts = posts.filter((p)=>id != p.id);
res.redirect("/posts");
});

//starting the server
app.listen(8080 , ()=>{
console.log("server started at http://localhost:8080");
}); 