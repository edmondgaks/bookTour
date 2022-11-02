const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req,res) => {
    try {
        console.log(req.query);
        // filtering
        const queryObj = {...req.query};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(e => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr));
        const query = Tour.find(JSON.parse(queryStr));
        const tours = await query;
        // console.log(req.query);
        // sorting
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(req.query.sort)
        } else {
            query = query.sort('-createdAt');
        }
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