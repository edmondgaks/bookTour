const fs = require("fs")
const express = require("express");
const morgan = require("morgan");
const { jsonp } = require("express/lib/response");

const app = express();

app.use(morgan('dev'))

app.use(express.json());


app.use(express.static(`${__dirname}/public`))

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);


app.use((req,res,next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})


// app.get('/',(req,res) => {
//     res.status(404).json({message: "Hello from the server side", app: "Natours"});
// });

// app.post('/',(req,res) => {
//     res.send('You caan post to this endpoint');
// })

const getAllTours = (req,res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}



const getTour = (req,res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id == req.params)
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }
    })
}


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours',getAllTours);
const createTour = (req,res) => {
    // console.log(req.body);
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err => {
        res.status(201).json({
            status: 'sucess',
            data: {
                tour: newTour
            }
        })
    })
}


app.post('/api/v1/tours',createTour )

const updateTour = (req,res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}
const deleteTour = (req,res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
}

const getAllUsers = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const getUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}
const createUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const updateUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}
const deleteUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/tours/:id').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);



module.exports = app;