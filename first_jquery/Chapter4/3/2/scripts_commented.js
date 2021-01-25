$(function(){

	var class_closed = 'closed'; // 닫기 위한 클래스를 정의
	
	$('.accordion').each(function(){
		
		// jQuery 오브젝트 준비
		var dl = $(this);
		var allDt = dl.find('dt');
		var allDd = dl.find('dd');

		// 모두 닫히는 함수
		function closeAll(){
			allDt.addClass(class_closed); // 모든 dt 클래스에 'closed' 추가
			allDd.addClass(class_closed); // 모든 dd 클래스에 'closed' 추가
		}

		// 지정된 요소를 닫는 함수
		function open(dt, dd){
			dt.removeClass(class_closed); // dt 클래스의 'closed' 삭제
			dd.removeClass(class_closed); // dd 클랙스의 'closed' 삭제
		}

		// 먼저 모든 dd를 닫음
		closeAll();

		// 이벤트를 설정
		allDt.click(function(){

			var dt = $(this);
			var dd = dt.next();

			closeAll(); // 모두 닫음
			open(dt, dd); // 클릭된 것을 열기

		});

	});

});