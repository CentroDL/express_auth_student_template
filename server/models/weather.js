var express = require('express');
var mongoose = require('mongoose');

var weatherSchema = mongoose.Schema({
    location: { type: String},
    temperature: { type: String}
    },
   {timestamps: true});


module.exports = mongoose.model( "Weather", weatherSchema)
