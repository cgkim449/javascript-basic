$(function(){

	// ===============================================
	// 탭으로 닫기 처리
	// ===============================================
	
	var currentTabIndex = 0;
	
	// 지시자 준비
	
	var tabIndicatorPointer = $('#tabIndicator .pointer');
	
	function changeIndicatorTo(index){
		// 전달된 index에 해당하는 위치로 포인터를 이동
		var val = index * 80;
		tabIndicatorPointer.css('left', val);
	}
	
	// 탭을 준비
	
	var tabs = $('#tabContainer a');
	var tabContentDivs = $('.tabContent').hide();
	tabContentDivs.eq(0).show();
	
	tabs.each(function(i, el){
		// 클릭하였을 때 해당하는 탭 표시를 한다
		$(el).click(function(e){
			e.preventDefault();
			changeIndex(i);
		});
	});
	
	// index에 해당하는 탭을 표시하는 함수
	
	function changeIndex(index) {
		if(currentTabIndex === index){
			return;
		}
		currentTabIndex = index;
		changeIndicatorTo(index);
		tabContentDivs.stop().hide();
		window.scrollTo(0, 0);
		tabContentDivs.eq(index).fadeIn(250);
	}
	
	// 다음 탭을 표시하는 함수
	
	function toNext(){
		if(currentTabIndex === 0){
			return;
		}
		var nextIndex = currentTabIndex - 1;
		changeIndex(nextIndex);
	}
	
	// 앞의 탭을 표시하는 함수
	
	function toPrev(){
		if(currentTabIndex === tabs.length-1){
			return;
		}
		var nextIndex = currentTabIndex + 1;
		changeIndex(nextIndex);
	}
	
	// ===============================================
	// 스와이프와 관련된 처리
	// ===============================================

	// 스와이프 경계값

	var threshold = 80;
	
	// 스와이프와 관련된 함수들
	
	var doc = $(document);
	var startX, currentX, startY, currentY;
	
	var sleeping = false; // 스와이프 감지 멈춤 플러그
	var touching = false; // 터치 여부
	var horizontalSwipe = false; // 가로방향 스와이프 여부
	var verticalSwipe = false; // 세로방향 스와이프 여부
	
	// 스와이프 방향 감지
	
	function checkSwipeDirection() {
		// 스와이프 시작점 보다 10px 이상 아래로 이동하고 있으면 수직 이동
		if((startY + 10) < currentY) {
			verticalSwipe = true;
			return;
		}
		if((startY - 10) > currentY) {
			verticalSwipe = true;
			return;
		}
		// 스와이프 시작점 보다 5px 이상 좌우로 이동하고 있으면 수평 이동
		if((startX + 5) < currentX) {
			horizontalSwipe = true;
			return;
		}
		if((startX - 5) > currentX) {
			horizontalSwipe = true;
			return;
		}
	}
	
	// 스와이프 평가
	
	function evalSwipe(event){
	
		// 스와이프 방향이 검색되지 않은 경우 방향을 확인
		if(!verticalSwipe && !horizontalSwipe){
			checkSwipeDirection();
			
			// 만약 가로방향 스와이프면 스크롤 중지
			// （touchstartかtouchmoveでpreventDefaultすればスクロールとまる）
			if(horizontalSwipe) {
				event.preventDefault();
			}
			// 세로 방향 스와이프이면 일반 스크롤로 판단하고
			// 다른 스와이프를 감지하지 않음
			if(verticalSwipe) {
				sleeping = true;
			}
		}
		
		// 좌우로 스와이프가 발생했는지 확인
		if((startX + threshold) < currentX){
			sleeping = true;
			toNext(); // 다음 탭へ
		}
		if(currentX < (startX - threshold)){
			sleeping = true;
			toPrev(); // 이전 탭へ
		}
		
	}
	
	// touchstart 이벤트 처리
	
	doc.on('touchstart', function(event){
		var touches = event.originalEvent.touches;
		if(touches.length>1){
			return;
		}
		var touch = touches[0];
		startX = touch.pageX; // X 좌표를 저장
		startY = touch.pageY; // Y 좌표를 저장
		touching = true;
	});
	
	// touchmove 이벤트 처리
	
	doc.on('touchmove', function(event){
		if(!touching) {
			return;
		}
		if(sleeping) {
			return;
		}
		var touch = event.originalEvent.touches[0];
		currentX = touch.pageX; // X 좌표를 저장
		currentY = touch.pageY; // Y 좌표를 저장
		evalSwipe(event);
	});
	
	// touchend, touchcancel이벤트 처리
	
	doc.on('touchend touchcanel', function(){
		if(!touching) {
			return;
		}
		// 각종 플러그를 재설정
		touching = false;
		sleeping = false;
		horizontalSwipe = false;
		verticalSwipe = false;
	});
	
});
