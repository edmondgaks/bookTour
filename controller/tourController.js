const Tour = require('./../models/tourModel.js');
const APIFeatures = require('./../utils//apiFeatures');
exports.aliasTopTours = (req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = async (req,res) => {
    try {
        console.log(req.query);
        // filtering
       
        // console.log(req.query);
        

        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) throw new Error('This page doesnot exists');
        // }

        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();

        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            results: tours.length,
            data: {
                tours
            }
        })
    } catch(error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        })
    }
}



 
exports.getTour = async (req,res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: {
                tours: tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        })
    }
    
}


exports.createTour = async (req,res) => {
    try {
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'sucess',
            data: {
                tour: newTour
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        })
    }
}


exports.updateTour = (req,res) => {
    try{
        const tour = Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
        
    }catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.deleteTour = (req,res) => {
    try {
        const tour = Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
    
}