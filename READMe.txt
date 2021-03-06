You may not use any previous code during the final exam. However,
 you are allowed to look up documentation online or refer to your
 one page (front and back) of notes that you printed out.

-------------
| Your Task |
-------------

Create a basic app with sign-up and login capabilities.

-----------------------
| Set-Up in server.js |
-----------------------

- Create an express app
- Connect mongoose to a local database
- Set up your view engine
 - You may either use hbs or express-handlebars
- Set up session and flash
- Set up bodyParser so that you can accept data from forms
- Set up static file hosting so that you can use css

----------
| Models |
----------

- User
 - This app only needs one model, User. A user object should house
   the following properties:
   - email
     - String, required, unique, must be a valid email
   - password
     - String, required

----------
| Routes |
----------

- GET /
 - The root route renders the index.hbs view. In this view,
   have a button to sign-up and one to login.

- GET /sign-up
 - This route renders the sign-up.hbs view. This view displays
   the sign-up form. The form should have a field for e-mail and
   a form for password. Submission sends you to POST /sign-up.

- POST /sign-up
 - When a user submits their sign-up form, this route is hit. In
   this route, check to see if the e-mail is unique and that the
   password meets these conditions:
     - Must be at least 6 characters long
     - Must include two digits
   If the email and password are satisfactory, save the new user
   to your database and redirect them to GET /login. When saving the user to your database, make sure that you hash their password. Otherwise, if either the email or the password are invalid
   for whatever reason, redirect them back to GET /sign-up and flash them with the appropriate error messages.

- GET /login
 - This route renders the login.hbs view. This view displays
   the login form. The form should have a field to enter an
   email address and a password. Submission sends you to
   POST /login.

- POST /login
 - When a user submits their login form, this route is hit. In
   this route, check to see if a user with this email exists in
   your database. If they do, check if the password they entered
   is the same as the password stored in the database (use bcrypt
   to compare them since the one in the database is hashed). If
   The passwords are the same, then store their id in the session
   under the name userID and redirect them to GET /home.

- GET /home
 - This route renders home.hbs. This view has a title that says
   "Home". Beneath the title, display Name: <the user's name>.
   Also, there is a link titled "logout" that redirects them
   to POST /logout. Users can only hit this route if they are
   logged in, so you must create a middleware function called
   validateUser (see below for details).

- POST /logout
 - This route sets the userID property of the session to undefined
   and redirects the user back to GET /.

--------------
| Middleware |
--------------

- validateUser
 - This middleware checks to see if a user ID is in the session.
   If their is, then it pulls the user out of the database and
   puts them in req.body.user. They are then passed on to the next route. Otherwise, the user gets redirected to GET / and flashed an error message.

-----------
| Styling |
-----------

- If you have time, add styling to your app to make it look better.
