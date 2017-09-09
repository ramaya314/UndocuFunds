const pg = require('pg')
const fs = require('fs');
const express = require('express');
const router = express.Router();

const promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: promise
});

var database = function() {

	var module = {};

	var usr = "ramaya";
	var sqlsrvp = process.env.DB_PW;
	var host = process.env.DB_URL || "ricamaya.cpzojuqt1ybh.us-east-1.rds.amazonaws.com";
	var port = "5432";

	const connectionString = 'postgres://' + usr + ':' + sqlsrvp + '@' + host + ':' + port + '/ricamaya';

	var db = pgp(connectionString);


	module.executeSqlFromFile = function(file, onSuccess, onError) {
		fs.readFile(file, 'ascii', function processSqlScript(err, content) {
			if(err) {
				onError && onError();
				console.log(err);
				return;
			}

			var client;
			try{
				client = new pg.Client(connectionString);
				client.connect();
			} catch(e) {
				console.log(e);
				onError && onError();
			}

			const query = client.query(content);
			query.on('error', () => {
				client.end();
				onError && onError();
			});
			query.on('end', () => {
				client.end();
				onSuccess && onSuccess();
			});
		});
	}

	module.executeSql = function(sql, params, onSuccess, onError) {
		const results = [];
		// Get a Postgres client from the connection pool
		pg.connect(connectionString, (err, client, done) => {
			// Handle connection errors
			if(err) {
				done();
				console.log(err);
				return onError && onError({success: false, data: err});
			}
			// SQL Query > Select Data
			const query = client.query(sql, params);
			// Stream results back one row at a time
			query.on('row', (row) => {
				results.push(row);
			});
			// After all data is returned, close connection and return results
			query.on('end', () => {
				done();
				return onSuccess && onSuccess(results);
			});
		});

	}

	return module;
}

module.exports = database;