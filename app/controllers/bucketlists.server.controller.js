'use strict';

/**
 * Server Controller code
 * Handle requests coming in to server from angularJS client
 * POST requests handled by the create() method, so on and so forth...
  */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bucketlist = mongoose.model('Bucketlist'),
	_ = require('lodash');

/**
  * Create a Bucketlist item
  * POST requests handled by the create() method  
  * When user submits the AngularJS form, it calls the AngularJS service
  * which invokes the server side create() method which then inserts  
  * the data into mongoDB
  */
exports.create = function(req, res) {
	var bucketlist = new Bucketlist(req.body);
	bucketlist.user = req.user;

	bucketlist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bucketlist);
		}
	});
};

/**
 * Show the current Bucketlist
 */
exports.read = function(req, res) {
	res.jsonp(req.bucketlist);
};

/**
 * Update a Bucketlist
 */
exports.update = function(req, res) {
	var bucketlist = req.bucketlist ;

	bucketlist = _.extend(bucketlist , req.body);

	bucketlist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bucketlist);
		}
	});
};

/**
 * Delete an Bucketlist
 */
exports.delete = function(req, res) {
	var bucketlist = req.bucketlist ;

	bucketlist.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bucketlist);
		}
	});
};

/**
 * List of Bucket list items
 * find all the entries in the bucketlist collection and returns them
 */
exports.list = function(req, res) { 
	Bucketlist.find().sort('-created').populate('user', 'displayName').exec(function(err, bucketlists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bucketlists);
		}
	});
};

/**
 * Bucketlist middleware
 */
exports.bucketlistByID = function(req, res, next, id) { 
	Bucketlist.findById(id).populate('user', 'displayName').exec(function(err, bucketlist) {
		if (err) return next(err);
		if (! bucketlist) return next(new Error('Failed to load Bucketlist ' + id));
		req.bucketlist = bucketlist ;
		next();
	});
};

/**
 * Bucketlist authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bucketlist.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
