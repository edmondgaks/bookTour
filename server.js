const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DB_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log("DB connection successfully");
})
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
})
const Tour = mongoose.model('Tour', tourSchema);
const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`App running on port ${port}..`);
});
