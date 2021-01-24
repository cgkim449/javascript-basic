$(function(){
	$('#div1').mouseenter(function(){
		$('#div1').text('마우스를 올려놓았습니다.');
	});
	$('#div1').mouseleave(function(){
		$('#div1').text('마우스가 벗어났습니다.');
	});
});
