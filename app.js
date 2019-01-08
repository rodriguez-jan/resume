var bodyParser      = require("body-parser"),
express             = require("express"),
expressSanitizer    = require("express-sanitizer"),
methodOverride      = require("method-override"),
mongoose            = require("mongoose"),
app                 = express();

mongoose.connect("mongodb://jan2:dota20@ds241723.mlab.com:41723/resume_blog", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIG
var blogSchema= new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type: Date, default: Date.now}   
})
var Blog=mongoose.model("Blog",blogSchema)


app.get("/",function(req,res){
    res.render("landing");
});

//INDEX ROUTE
app.get("/blogs", function(req,res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs:blogs});
        }
    })
})

//NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
})

//CREATE ROUTE
app.post("/blogs",function(req,res){
    req.body.blog.body= req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
})

//SHOW ROUTE
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else {
            res.render("show", {blog:foundBlog});
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog:foundBlog});
        }
    })
})


//UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
    req.body.blog.body= req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
        if(err){
            res.redirect("/blogs");
        
        }else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.reidrect("/blogs");
        }else{
            res.redirect("blogs");
        }
        
    })
})

//CONTACT PAGE ROUTE
app.get("/contact" , function(req, res) {
    res.render("contact");
})



app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server is Running, we up in this");
})
   
