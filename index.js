require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const targetRouter = require('./router/target');
const main = require('./main');

app.use(express.json());
app.use(cors());

app.use('/api/v1/targets', targetRouter);

// app.use((err, req, res, next) => {
//     res.json({ msg: err.message });
// });

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => {
        console.log(`Server is listening port ${PORT}...`);
    }))
    .catch(err => console.log(err));

/* run every five minutes */
setInterval(main, process.env.FREQUENCY * 60 * 1000);