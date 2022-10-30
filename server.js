const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

// const DB = process.env.DATABASE_ATLAS.replace('<PASSWORD>',process.env.DB_PASSWORD);

mongoose.connect(process.env.DATABASE_ATLAS).then(con => {
    console.log("DB connection successfully");
})



const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`App running on port ${port}..`);
});
