const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');

// const DB = process.env.DATABASE_ATLAS.replace('<PASSWORD>',process.env.DB_PASSWORD);

mongoose.connect(process.env.DATABASE_ATLAS).then(con => {
    console.log("DB connection successfully");
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours); 
        console.log('Data successfully loaded!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    deleteData(); 
}

console.log(process.argv);