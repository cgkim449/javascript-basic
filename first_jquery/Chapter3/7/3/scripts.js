$(function(){
	$('#div1').hover(function(){
		$('#div1').text('마우스를 올려놓았습니다');
	}, function(){
		$('#div1').text('마우스가 벗어났습니다');
	});
});
