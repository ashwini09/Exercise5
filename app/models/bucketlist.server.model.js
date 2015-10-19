'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * This is the bucket list model (back end)
 * Everything in Mongoose starts with a Schema. 
 * Each schema maps to a MongoDB collection and 
 * defines the shape of the documents within that
 * collection.
 * See: http://mongoosejs.com/docs/guide.html
 */

/**
 * Bucketlist Item Schema
 * Name: name of the bucket list item
 * Date: Date the item was created
 * User: User who created the item
 * What changes to the schema are needed?
 */
var BucketlistSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Bucket list item name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

/*
 * To use the schema definition, need to convert the 
 * schema into a Model we can work with
 */
mongoose.model('Bucketlist', BucketlistSchema);