$(function(){
	
	$('.accordion').each(function(){
		
		// jQuery 오브젝트를 준비
		var dl = $(this);
		var allDt = dl.find('dt');
		var allDd = dl.find('dd');

		// 처음에는 모든 dd를 닫음
		allDd.hide();

		// dt의 마우스 포인트를 변경
		allDt.css('cursor','pointer');

		// 이벤트를 설정
		allDt.click(function(){

			var dt = $(this);
			var dd = dt.next(); // 다음 요소를 획득

			// 클릭한 부분만 열기
			allDd.hide();
			dd.show();

			// 마우스포인트 변경
			allDt.css('cursor','pointer');
			dt.css('cursor','default');

		});

	});

});