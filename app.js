var bodyParser      = require("body-parser"),
express             = require("express"),
expressSanitizer     = require("express-sanitizer"),
methodOverride      = require("method-override"),
mongoose            = require("mongoose"),
app                 = express();

mongoose.connect("mongodb://jan2:dota20@ds241723.mlab.com:41723/resume_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/",function(req,res){
    res.render("home");
})


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server is Running, we up in this");
})
   
