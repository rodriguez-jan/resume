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
    created: {type: Date, default: Date.now}    //Read this as having a type of Date that is already initialized with the default value of the time that it was created
})
var Blog=mongoose.model("Blog",blogSchema)




app.get("/",function(req,res){
    res.render("landing");
});

app.get("/index" , function(req,res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log("error my nigga!");
        }else{
            res.render("index", {blogs:blogs});
        }
    })
})



app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server is Running, we up in this");
})
   
