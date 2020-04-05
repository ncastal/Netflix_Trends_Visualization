var tableData;
d3.csv('data/map_data/netflix.csv').then(function (data) {
	tableData = data;
	renderTable(tableData)	
});


function renderTable(data) {
	var tbody = d3.select('tbody');

	tbody.html('');
	data.forEach(dataRow => {
		var row = tbody.append('tr');
		Object.entries(dataRow).forEach(([key,val]) => 
		{
			console.log(key);
			if(key!="Index")
			{
			var cell = row.append('td');
			cell.text(val);
			}
		})
	});
};