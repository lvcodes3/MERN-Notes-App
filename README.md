# MERN Notes App

## Technologies Used:

`Node.js`, `Express.js`, and `MongoDB` for the backend web server.

`React` for the frontend.

## Backend Info:

.env file must contain:
PORT=YOURPORTNUMBER
MONGO_CONNECTION_STRING=YOURMONGOCONNECTIONSTRING
SESSION_SECRET=YOURSESSIONSECRET

start server with:
npm start

development with:
npm run dev

npm dependencies utilized:
express - Node.js express web server
express-session - to handle user authentication server-side
mongoose - to handle MongoDB object modeling
connect-mongo - MongoDB session store for handling user authentication with express-session
dotenv - env variables
envalid - validation for env variables
bcrypt - for hashing passwords that are stored in MongoDB
http-errors - for creating http errors
joi - object schema validation for data
morgan - logger

## Frontend Info:

start with:
npm start

Styling provided by TailwindCSS and daisyUI.

optional npm dependencies used:
react-hook-form - to validate form inputs
react-hot-toast - to display errors
react-icons - styling
react-router-dom - navigation between pages

Must Register or Login (authenticate) to access primary functionalities.

React Context handles user authentication for global scope throughout app.
