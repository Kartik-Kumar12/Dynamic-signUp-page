const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/customerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const designerSchema = new mongoose.Schema({
  timeCapacity: Number,
  desinerType: String,
  training: String,
});
const makerSchema = new mongoose.Schema({
  projectCapacity: {
    type: Number,
    min: 1,
    max: 10,
  },
  material: String,
  location: String
});
const makeAndDesignSchema = new mongoose.Schema({
  timeCapacity: Number,
  desinerType: String,
  training: String,
  projectCapacity: {
    type: Number,
    min: 1,
  },
  material: String,
  location: String
})
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  category: Object,
});
const design = mongoose.model("design", designerSchema);
const maker = mongoose.model("maker", makerSchema);
const makerAndDesiner = mongoose.model("makerAndDesiner", makeAndDesignSchema);
const user = mongoose.model("user", userSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() {
  console.log('Server has started successfully on port 3000');
});

app.get('/', function(req, res) {
  res.render("base");
});
app.post('/', function(req, res) {
  const body = req.body;
  if (body.password === body.conf_password) {
    let newItem;
    if (body.type.includes("designer") && body.type.includes("maker")) {

      newItem = new makerAndDesiner({
        timeCapacity: body.numberofHours,
        desinerType: body.typeOfDesigner,
        training: body.training,
        projectCapacity: body.numberofProjects,
        material: body.material,
        location: body.location

      });

    } else if (body.type.includes("designer")) {
      newItem = new design({
        timeCapacity: body.numberofHours,
        desinerType: body.typeOfDesigner,
        training: body.training,
      });
    } else {
      newItem = new maker({
        projectCapacity: body.numberofProjects,
        material: body.material,
        location: body.location
      });
    }
    newItem.save();
    const newUser = new user({
      email: body.email,
      password: body.password,
      category: newItem,
    });
    newUser.save();
    res.redirect('/success');
  } else {

    res.redirect('/failure');
  }

});
app.get('/success', function(req, res) {
  res.render('success');
});
app.get('/failure', function(req, res) {

  res.render('failure');
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});
app.get('/content', function(req, res) {
  user.find({}, function(err, users) {
    if (err) {
      console.log("Error occured");
      res.redirect('/');
    } else {
      res.render("content", {
        users: users
      })
    }
  });
});
