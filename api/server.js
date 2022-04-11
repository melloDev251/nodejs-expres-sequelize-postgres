const express = require('express')
const app = express()

require('dotenv').config({ path: './config/.env' })

// call db
const db = require('./models')
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db')
})

const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:4200',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to app' })
})

// middlewire
// app.use((req, res, next) => {
//   console.log("middleware started");
//   next();
// });

// route
require('./routes/tutorial.route')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
