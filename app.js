// Like the import in java
const ex = require("express");
const bodyparser = require("body-parser");
let workItems = [];


// instanciate the imports
const app = ex();
var items = ["Buy Food", "Cook Foof", "Eat Food"];

app.set('view engine', 'ejs'); // This line most not be below 
app.use(bodyparser.urlencoded({extended: true}));
app.use(ex.static("public"));

// routing the browser and displaying the Date 
app.get("/", function(req, res){
	var today = new Date();
	var options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};
	var day = today.toLocaleString("en-US", options);
	
 	res.render("index", {listTitle: day, ourNewItems: items});
});
app.post("/", function(req, res){
	let item = req.body.newItem;  // grabs the text from d text filds newItem. 
	if(req.body.list === "Work"){
		workItems.push(item);
		res.redirect("/work")
	}
	else{
			items.push(item);
			res.redirect("/");
	}

});
// Redirecting the user their diffrent pages 
app.get("/ ", function(req,res){
	res.render("index", {listTitle: "Work List", ourNewItems: workItems });
});
app.post("/work", function(req,res){
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});
app.get("/about", function(req,res){
	res.render("about");
})

// starting the server on port 3000 
app.listen(3000, function(){
 console.log("Server running on Port 3000");
});