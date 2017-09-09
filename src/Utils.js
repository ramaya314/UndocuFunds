
class Utils 
{
	static prepareGSArrayForTable(gsArray) {

		if(gsArray.length <= 0)
			return null;

		var tableData = [];

		var columnRow = gsArray[0];

		for(var i = 1; i < gsArray.length; i++) {

			var row = gsArray[i];
			var rowObject = {id : i};

			for (var j = 0; j < row.length; j++) {
				rowObject[columnRow[j]] = row[j]
			}
			if(tableData.indexOf(rowObject) < 0)
				tableData.push(rowObject);
		}
		return tableData
	}

	static getFirstWordOfString(str) {
		if(!str || str.length <= 0 || str.indexOf(" ") < 0)
			return str;

		return str.substr(0, str.indexOf(" "));
	}
}

export default Utils