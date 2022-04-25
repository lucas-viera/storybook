# Node.js CRUD Application using Express, MongoDB and Google OAuth

Link to the [video][1]

Link to the original [repository][2]



## Project explanation
It consists of a webapp which ask the user to login with Google. Then, the user will be able to add and modify stories cards from the UI directly.



## Run the project localy
1. Install dependencies needed with `npm install`

### To run in dev mode
- Run `npm run dev`

### To run in dev mode
- Run `npm starts`



## Project Setup and Implementation

### Init project
- Initiate the project with `npm init` and complete with author, description, license, etc

### Install dependencies for production and development
1. `npm install express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20`
2. `npm install -D nodemon cross-env`

### Add scripts to package.json
- Add 
```json
"start": "cross-env NODE_ENV=production node app",
"dev": "cross-env NODE_ENV=development nodemon app"
```

### File app.js 
1. Create `app.js` file 
2. Create a basic express server and use `dotenv` to read the config file
3. Create `config/config.env` and complete with real data.

### MongoDB Atlas
- We'll be using MongoDB Atlas. So we'll need to create an account at [mongodb.com][3] so we can have a user for authentication
- Extract Mongo URI to connect to DB from `Cluster > Connect to your application`
- Paste it to `config.env` replacing `<password>` and `<dbname>`

### File db.js
- Create `config/db.js` to connect to database using `mongoose` and an asynchronous function. Export the `connectDB` module so it can be used from `app.js`
- Warning: original code has a bug and does not need deprecation warning options such as `userNewUrlParser`, `useUnifiedTopology` or `useFindAndModify`

### Logging with morgan
- Use morgan middleware for logging.
- This will only be configured in development environment and in dev level.

### Use handlebars, create view s and add routes
- Require handlebars and use the middleware
- Create `views/layouts/login.hbs` and `views/layouts/main.hbs`
- Create `routes/index.js` and add routes to `router.get('/')` and `router.get('/dashboard')`
- Use routes from `app.js` and test `localhost:PORT` and `localhost:PORT/dashboard`
- Now create `views/login.hbs` and `views/dashboard.hbs` and change `res.send` for `res.render` at `index.js`. Observe how new `HTML` is now contained inside main layout


### Styles
- Visit [Materialize CSS][5] website and integrate the CDNs urls to our project.
- Visit [cdnjs.com][6] to integrate font-awesome to our project
- Add a static folder to use personalized CSS files
- Style Login layout and add classes to style login container.
- Add icon to Login View and Google button to login.

### Google OAuth
- We are going to need an API Key and Secret for this to work


[1]:https://youtu.be/SBvmnHTQIPY
[2]:https://github.com/bradtraversy/storybooks
[3]:https://www.mongodb.com/
[4]:https://mongoosejs.com/docs/migrating_to_6,html#no-more-deprecation-warning-options
[5]:https://materializecss.com/
[6]:https://cdnjs.com/