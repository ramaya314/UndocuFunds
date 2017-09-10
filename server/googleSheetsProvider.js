
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var readline = require('readline');
var googleAuthorizer = require('./googleAuthorizer.js');

var googleSheetsProvider = function (spreadSheetId) {

	var spreadSheetId = spreadSheetId;


	var sheets = google.sheets('v4');
	
	var authorizer = new googleAuthorizer({
		clientSecretFilePath: 'keys/sheetsKey.json',
		tokenPath: 'keys/sheetsToken.json',
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

	return module;
};


module.exports = googleSheetsProvider;