$(function(){
	var tbody = $('#tbody');
	$.getJSON('data.json', function(people){
		alert(people);

	});
});
