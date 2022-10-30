const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req,res) => {
    try {
        const tours = await Tour.find()
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            results: tours.length,
            data: {
                tours
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: err
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
            message: err
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
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}
exports.deleteTour = (req,res) => {
    
    res.status(204).json({
        status: 'success',
        data: null
    });
}