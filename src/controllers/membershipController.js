const Membership = require('../models/Membership');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createMembership = async (req, res) => {
    const {email} = req.body
    const emailAlreadyExists = await Membership.findOne({ email });
    if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
     }
    const membership = await Membership.create(req.body);
    await membership.save();
    res.status(StatusCodes.CREATED).json(membership);    
};


module.exports = {
    createMembership
};
