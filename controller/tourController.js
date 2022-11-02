const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req,res) => {
    try {
        //filtering
        const queryObj = {...req.qeury};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(e => delete queryObj[el]);

        // advanced filtering
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace('/\b(gte|gt|lte|lt|\b/g', match => `$${match}`);
        console.log(JSON.parse(queryStr));
        console.log(req.query, queryObj);
        let query = Tour.find(JSON.parse(queryStr));
        // sorting 
        if(req.qeury.sort) {
            const sortBy = req.qeury.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        const tours = await query;
        console.log(req.query);
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
            message: err
        })
    }
    
}