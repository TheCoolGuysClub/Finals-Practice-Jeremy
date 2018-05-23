const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('hbs');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
const authRoute = require(`./routes/authRoute.js`);


app.set(`views`,path.join(__dirname,`views`));
app.set(`view engine`,`hbs`);

app.use(express.static(path.join(__dirname,`public`)));


app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{secure:true}
}));

app.use(flash());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(morgan(`dev`));
  app.use((req,res,next)=>{
    res.locals.successMessage = req.flash(`successMessage`);
    res.locals.errorMessages = req.flash(`errorMessages`);
    next();
  })
app.use(`/`,authRoute);



app.listen(port,()=>{
  console.log(`Web Server up on port ${port}!`);
})
