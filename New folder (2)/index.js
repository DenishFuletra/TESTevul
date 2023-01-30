const express = require('express');
const ConnectDatabase = require("./database/Database")

const app = express();
const router = require("./routes/Routes");

const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/', router);

ConnectDatabase()
    .then(() => {
        try {
            app.listen(3500, () => {
                console.log("Server is started");
            })
        }
        catch (err) {
            console.log(err.message);
        }
    })
