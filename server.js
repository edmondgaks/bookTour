const app = require('./app');


const tourUser = new mongoose.Schema({
    name: String,
    required: [true,'A ']
})

const port = 3000;
app.listen(port, ()=> {
    console.log(`App running on port ${port}..`);
});
