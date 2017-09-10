
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var readline = require('readline');
var googleAuthorizer = require('./googleAuthorizer.js');

var googleSheetsProvider = function (spreadSheetId) {

	var spreadSheetId = spreadSheetId;


	var sheets = google.sheets('v4');
	
	var authorizer = new googleAuthorizer({
		clientSecretFilePath: 'keys/gcs.json',
		tokenPath: 'keys/sheets.googleapis.com-nodejs-quickstart.json',
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	var module = {};

	module.log = function() {
		console.info(spreadSheetId);
	}


	module.getRowsForRange = function(range, onSuccess, onError)  {

		var getTheRows = function(auth) {

			var sheets = google.sheets('v4');
			sheets.spreadsheets.values.get({
				range: range,
				spreadsheetId: spreadSheetId,
				auth: auth,
			}, function(err, response) {
				if(err) {
					onError && onError(err);
					return;
				}
				onSuccess && onSuccess(response.values);
			});
		}


		authorizer.authorizeForCallback(getTheRows, onError);

	}

	module.signDACAPetition = function(signeeInfo, onSuccess, onError) {

		function sendUniqueSignature() {
			var sendDACAPetitionSignature = function(auth) {
				var requests = [];

				requests.push({
					appendCells: {
						rows: [{
							values: [{
								userEnteredValue: {stringValue: signeeInfo.fullname}
							}, {
								userEnteredValue: {stringValue: signeeInfo.email}
							}, {
								userEnteredValue: {stringValue: signeeInfo.organization}
							}, {
								userEnteredValue: {stringValue: signeeInfo.iam}
							}, {
								userEnteredValue: {stringValue: signeeInfo.iamspecific}
							}, {
								userEnteredValue: {stringValue: (new Date()).toISOString()}
							}]
						}],
						fields: 'userEnteredValue'
					}
				});

				var batchUpdateRequest = {requests: requests}

				sheets.spreadsheets.batchUpdate({
					auth: auth,
					spreadsheetId: spreadSheetId,
					resource: batchUpdateRequest
				}, function(err, response) {
					if(err) {
						// Handle error
						onError && onError(err);
						return;
					}
					onSuccess && onSuccess(response);
				});
			}

			authorizer.authorizeForCallback(sendDACAPetitionSignature, onError);
		}

		var getKeyRows = function(auth) {

			var sheets = google.sheets('v4');
			sheets.spreadsheets.values.get({
				range: "Sheet1",
				"majorDimension": "COLUMNS",
				spreadsheetId: spreadSheetId,
				auth: auth,
			}, function(err, response) {
				if(err) {
					onError && onError(err);
					return;
				}
				if(response.values.length <= 0) {
					onError && onError("No Values");
					return;
				}
				//lets prevent duplicate names
				var namesArray = response.values[0]
				if(namesArray.indexOf(signeeInfo.fullname) < 0) {
					sendUniqueSignature();
				} else {
					//send a succesful response so that we don't have to interrupt the client
					onSuccess && onSuccess();
				}
			});
		}



	module.sendLobbyForm = function(data, onSuccess, onError) {

		function sendUniqueResponse() {
			var sendResponse = function(auth) {
				var requests = [];

				requests.push({
					appendCells: {
						rows: [{
							values: [{
								userEnteredValue: {stringValue: data.name}
							}, {
								userEnteredValue: {stringValue: data.email}
							}, {
								userEnteredValue: {stringValue: data.phone}
							}, {
								userEnteredValue: {stringValue: data.zip}
							}, {
								userEnteredValue: {stringValue: data.exp}
							}, {
								userEnteredValue: {stringValue: data.otherExp}
							}, {
								userEnteredValue: {stringValue: (new Date()).toISOString()}
							}]
						}],
						fields: 'userEnteredValue'
					}
				});

				var batchUpdateRequest = {requests: requests}

				sheets.spreadsheets.batchUpdate({
					auth: auth,
					spreadsheetId: spreadSheetId,
					resource: batchUpdateRequest
				}, function(err, response) {
					if(err) {
						// Handle error
						onError && onError(err);
						return;
					}
					onSuccess && onSuccess(response);
				});
			}

			authorizer.authorizeForCallback(sendResponse, onError);
		}

		var getKeyRows = function(auth) {

			var sheets = google.sheets('v4');
			sheets.spreadsheets.values.get({
				range: "Sheet1",
				"majorDimension": "COLUMNS",
				spreadsheetId: spreadSheetId,
				auth: auth,
			}, function(err, response) {
				if(err) {
					onError && onError(err);
					return;
				}
				if(response.values.length <= 0) {
					onError && onError("No Values");
					return;
				}
				//lets prevent duplicate emails
				var emailsArray = response.values[0]
				if(emailsArray.indexOf(data.email) < 0) {
					sendUniqueSignature();
				} else {
					//send a succesful response so that we don't have to interrupt the client
					onSuccess && onSuccess();
				}
			});
		}

		authorizer.authorizeForCallback(getKeyRows, onError);
	}




	return module;
};


module.exports = googleSheetsProvider;