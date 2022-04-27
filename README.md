# Node.js CRUD Application using Express, MongoDB and Google OAuth

Link to the [video][1]

Link to the original [repository][2]



## Project explanation
It consists of a webapp which ask the user to login with Google. Then, the user will be able to add and modify stories cards from the UI directly.



## Run the project localy
1. Install dependencies needed with `npm install`

### To run in dev mode
- Run `npm run dev`

### To run in prod mode
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
- We are going to need an API Key and Secret for this to work.
- Visit [Google Cloud Console][7] and create a Project
- Go to API and Services and Enable API and Services
- Search for Google+ API and Enable it.
- First, complete OAuth Consent screen.
- Then click on Credentials and click con OAuth Client ID.
- Add Client ID and Secret to `config/config/env`
  
### Passport
- Visit [passportjs website][8] and go to View All Strategies. Look for [`passport-google-oauth20`][9]
- Require `passport` and `session` from `app.js` and setup up each middleware
- Create `config/passport.js` file.
- Create user model in `modelx/User.js`
- Configure `passport.js` properly. 
- Investigate serialization for users.
- Add routes and create `routes/auth.js`
- Up to this point, the system will hang if we try to Log In because there is no action programmed other than `console.log(profile)` in `passport.js`
- Now we complete this part of the code and try a new login.
- We should now see the user registered in the Database Collection

### Logout feature
- Add a new route in `auth.js`

### NavBar and burger menu button
- Create a partial at `/views/partials/_header.hbd` and add the navbar code
- Add `{{ > _header}}` inside `{{{body}}}` in `views/layouts/main.hbs`
- Init the `M.Sidenav` and test.
- System should now support loggout and fuctionality from the burger menu button.
- We should block access directly without being logged in using a middleware.

### Auth.js middleware
- Create `middleware/auth.js` and add `ensureAuth` and `ensureGuest` to check if user is logged in or not.
- At `route/index.js` require the middleware and add it as second argument to each route.

### Store session 
- Added a `store:` in `app.use(session({...}))`
- Require `connect-mongo` and `mongoose` from `app.js`
- Observe that this part of the video is not currently supported and needed to [adapt][10] to a newer version of `connect-mongo`
- Once this was corrected, we can now refresh and loggin again. Check MongoDB to see the session for the user:
```
_id:"Yi6QT..."

{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":"626..."}}
```

### Dashboard
- Added the first name of the user to the dashboard route in `index.js` so it can be used from the views.
- Next, modify `dashboard.hbs` so it uses the new information.
  
### Stories
- Create a new model for the stories: `models/Story.js`
- It will contain a `title`, a `body` a `status` (public or private), the `user` (which is a special type `mongoose.Schema.types.ObjectId`) and `createdAt`.
- At `index.js` add a `try-catch` logic to read user's stories.
- Add error views `views/error/x00` and render them inside `catch`
- At `dashboardh.hsb` add logic to check if there are stories.
- Then, create a table to show them.
- Create a partial for Add Story Button and insert it into `views/layouts/main.hbs` below header `{{> _add_button}}`
- Look at the website and verify it now has the Add Button.
- If clicked it will redirect to `/stories/add` but it's not implemented yet.

### Add Story feature
- As there are several views for stories needed, create a `views/stories/` directory
- Create `views/stories/add.hbs`
- Create the route `route/stories.js` 
- Use the route from `app.js`
- At this point, the Add Story Button should redirect fine with minor visual details.
- To fix this, in `views/layouts/main.hbs` add `M.FormSelect.init(document.querySelector('#status'))`

### CKEditor 
- We'll integrate [CKEdito][11] to the story text area so the user has a more friendly interface.
- Copy and Paste the script tag to `views/layouts/main.hbs` and initializite. Observe we did not selected plugins
- Add POST route in `stories.js` and use `req.body`. To use `req.body` we'll need to use body in `app.js`
- Once configured in `app.js`, next thing is to create the user from the body and redirect to `/dashboard'
- At this point, system will take the new story, save it to database and redirect correctly. Also, if the user logs out and logs in with another user, it should not see private stories.

### Date formatting
- Create `helpers/hbs.js` as handlebar helper
- We are going to use `moment` for this
- In `app.js` we required all `helpers/hbd` and added them to `app.engine`.
- Then, in `views/dashboard.hbs` we replace `createdAt` for `fomatDate createdAt 'MMM Do YYYY, h:mm:ss a'`
- At this point, system should register stories with formatted dates.


### Public Stories
- Create `views/stories/index.hbs` and setup a `for-each` so each story has an image, the content and a link to user profile and Read More button.
- In `routes/stories.js` 


[1]:https://youtu.be/SBvmnHTQIPY
[2]:https://github.com/bradtraversy/storybooks
[3]:https://www.mongodb.com/
[4]:https://mongoosejs.com/docs/migrating_to_6,html#no-more-deprecation-warning-options
[5]:https://materializecss.com/
[6]:https://cdnjs.com/
[7]:https://console.cloud.google.com/
[8]:https://www.passportjs.org/
[9]:https://www.passportjs.org/packages/passport-google-oauth20/
[10]:https://stackoverflow.com/questions/66654037/mongo-connect-error-with-mongo-connectsession
[11]:https://cdnjs.com/libraries/ckeditor