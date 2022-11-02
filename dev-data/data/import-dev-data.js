const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel');

// const DB = process.env.DATABASE_ATLAS.replace('<PASSWORD>',process.env.DB_PASSWORD);

mongoose.connect(process.env.DATABASE_ATLAS).then(con => {
    console.log("DB connection successfully");
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

const importData = async () =>{
    try {
        await Tour.create(tours);
        console.log('Data successfully added');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}
if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    deleteData();
}
console.log(process.argv)