import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let blogs = [];

app.get("/create",(req,res) =>{
    res.render("create.ejs")
})

app.post("/create",(req,res) =>{
    const title = req.body.title;
    const content = req.body.content;

    blogs.push({title,content});

    res.redirect("/");
})

app.get("/delete", (req, res) => {
    res.render("delete.ejs");
});

app.post("/delete", (req, res) => {
    const deleteTitle = req.body.deleteTitle;

    const index = blogs.findIndex(blog => blog.title === deleteTitle);

    if (index !== -1) {
        blogs.splice(index, 1);
        res.redirect("/");
    } else {
        res.redirect("/");
    }
});

app.get("/",(req,res) =>{
    res.render("index.ejs",{blogs});
});

app.listen(port,() => {
    console.log(`Currently Listening to port ${port}...`);
});
