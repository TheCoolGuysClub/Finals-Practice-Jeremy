const express = require(`express`);
const authRoute = express.Router();
const {body, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require(`bcryptjs`);

const User = require('../models/user.js')
const {validateUser} = require('../middleware/middleware.js')


authRoute.get('/', (req, res) => {
  res.render('index');
})

authRoute.get('/sign-up', (req, res) => {
  res.render('sign-up');
})

authRoute.get('/login', (req, res) => {
  res.render('login');
})

authRoute.post('/sign-up', [
  body('email')
    .isEmail()
    .withMessage("invalid email adress"),
  body('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contains at least one digit')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(obj => {
        return {message: obj.msg}
      });
      // console.log('Original errors:', errors.array());
      // console.log('Mapped errors:', errorMessages);

      req.flash('errorMessages', errorMessages)
      return res.redirect('/sign-up');
    }
    const userData = matchedData(req);
    const user = new User(userData);
    user.save()
      .then(user => {
        req.flash('sucessMessage', {message: "sign up succuessful"});
        res.redirect('/login');
      }).catch(e => {
        if(e.code === 11000) {
          req.flash('errorMessages',{message: "Duplicate Email!!!"} );
        }
        res.redirect('/sign-up');
      })

})



authRoute.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user) {
        req.flash('errorMessages', {message: 'This email does not exist.'});
        res.redirect('/login');
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              req.session.userId = user._id;
              console.log('userID in session:', user._id);
              req.flash('sucessMessage', {message: "login succuessful"});
              res.redirect('/home');
            } else {
              req.flash('errorMessages', {message: 'Invalid password'});
              res.redirect('/login');
            }

          })
          .catch(e => {
            console.log(e);
          })
      }
    })
    .catch(e => {
      req.flash('errorMessages', {message: 'This email does not exist.'});
      res.redirect('/login');
    })
})

module.exports = authRoute;
