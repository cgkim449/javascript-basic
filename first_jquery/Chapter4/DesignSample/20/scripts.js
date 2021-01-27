$(function(){

	var threshold = 80; // 스와이프가 발생할 거리
	var oneMoveDistance = 330; // 한번의 슬라이드 이동거리
	
	// 사용요소를 준비
	var doc = $(document);

	// .photos 각각 처리한다
	$('.photos').each(function(){
	
		// ===============================================
		// 슬라이드에 관한 처리
		// ===============================================
		
		// 슬라이드에 관한 요소를 준비
		var container = $(this);
		var inner = container.find('.inner');
		var items = container.find('.item');
		
		// 점
		var $dots = container.find('.dotContainer span');
	
		// 현재 left값을 저장하기 위한 변수
		var currentLeft = 0;
		// 최대 left값
		var maxLeft = 0;
		// 최소 left값
		var minLeft = -1 * oneMoveDistance * (items.length - 1);
		
		// 한 단계 왼쪽으로 슬라이드 시키는 함수
		var toLeft = function(){
		
			var nextLeft = currentLeft - oneMoveDistance;
			
			if(nextLeft < minLeft) {
				return;
			}
			
			// 사진을 슬라이드
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
			
			// 점을 이동
			var currentDot = $dots.filter('.current');
			currentDot.removeClass('current');
			currentDot.next().addClass('current');
			
		};
		
		// 한 단계 오른쪽으로 이동하는 함
		var toRight = function(){
		
			var nextLeft = currentLeft + oneMoveDistance;
			
			if(nextLeft > maxLeft) {
				return;
			}
			
			// 스진을 슬라이드
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
			
			// 점을 이동
			var currentDot = $dots.filter('.current');
			currentDot.removeClass('current');
			currentDot.prev().addClass('current');
			
		};
		
		// ===============================================
		// 스와이프에 관련된 처리
		// ===============================================
	
		// 좌표를 저장하기 위한 변수
		var startX, currentX, startY, currentY;
		
		var sleeping = false; // 스와이프 감지 멈춤 플러그
		var touching = false; // 터치 여부
		var horizontalSwipe = false; // 가로방향 스와이프 여부
		var verticalSwipe = false; // 세로방향 스와이프 여부
	
		// 스와이프 방향 감지
		
		function checkSwipeDirection() {
			// 스와이프 시작점에서 10px 이상 아래로 이동하였으면 수직 이동
			if((startY + 10) < currentY) {
				verticalSwipe = true;
				return;
			}
			if((startY - 10) > currentY) {
				verticalSwipe = true;
				return;
			}
			// 스와이프 시작점에서 5px 좌우로 이동하였으면 수평이동
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
		
		var evalSwipe = function(event){
		
			// 스와이프 방향이 검색되지 않으면 방향을 확인
			if(!verticalSwipe && !horizontalSwipe){
				checkSwipeDirection();
				
				// 만약 가로방향 스와이프이면 스크롤 중지
				// （touchstart가 touchmove로 preventDefault하면 스크롤 중지）
				if(horizontalSwipe) {
					event.preventDefault();
				}
				// 세로방향 스와이프이면 일반 화면 스크롤로 판단하고
				// 다른 스와이프를 감지할 것
				if(verticalSwipe) {
					sleeping = true;
				}
			}
			
			// 좌우 스와이프가 발생하였으면 체크
			if((currentX - startX) > threshold) {
				toRight(); // 오른쪽へ슬라이드
				sleeping = true;
			}
			if((startX - currentX) > threshold) {
				toLeft(); // 왼쪽へ슬라이드
				sleeping = true;
			}
			
		};
		
		// touchstart 이벤트의 처리
		
		container.on('touchstart', function(event){
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
		
		// touchend, touchcancel 이벤트 처리
		
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
		
	}); // photos each
	
});
