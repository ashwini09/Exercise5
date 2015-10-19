'use strict';

/**
 * Express routes are configured here
 * So that service calls from AngularJS are handled properly
 */

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bucketlists = require('../../app/controllers/bucketlists.server.controller');

	// Bucketlists Routes
	// HTTP GET to this route calls the list method in the controller
	// HTTP POST to this route calls the create method in the controller
	app.route('/bucketlists')
		.get(bucketlists.list)
		.post(bucketlists.create);

	app.route('/bucketlists/:bucketlistId')
		.get(bucketlists.read)
		.put(bucketlists.update)
		.delete(bucketlists.delete);

	// Finish by binding the Bucketlist middleware
	app.param('bucketlistId', bucketlists.bucketlistByID);
};
