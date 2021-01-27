$(function(){

	// 다양한 설정 값
	
	var threshold = 80; // 스와이프가 발생할 거리
	var oneMoveDistance = 300; // 한번의 슬라이드 이동 거리
	
	// index에 관한 변수
	
	var currentIndex = 0; // 현재index
	var minIndex = 0; // 최소index
	var maxIndex = $('#calenderInner table').length - 1; // 최대 index
	
	// 사용 요소를 준비
	
	var doc = $(document);
	
	// ===============================================
	// 제목에 관한 처리
	// ===============================================
	
	var title = $('#calendarTitle');
	
	var monthLabels = [
		'2014 January',
		'2014 February',
		'2014 March ',
		'2014 April',
		'2014 May',
		'2014 June',
		'2014 July',
		'2014 August',
		'2014 September',
		'2014 October',
		'2014 November',
		'2014 December'
	];
	
	// 현재index에 따라 라벨의 내용을 제목으로 설정
	
	function updateTitle(){
		title.text(monthLabels[currentIndex]);
	}
	
	updateTitle(); // 처음은 1월의 캘린더
	
	// ===============================================
	// 캘린더 슬라이드에 대한 처리
	// ===============================================
	
	var calendarInner = $('#calenderInner');
	
	// 현재 index 대한 위치 슬라이드
	
	function slideCalendar(){
		var nextLeft = -1 * oneMoveDistance * currentIndex;
		calendarInner.stop().animate({ left: nextLeft }, 200);
	}
	
	// ===============================================
	// 버튼 작동에 관한 처리
	// ===============================================
	
	var prevButton = $('#prevButton');
	var nextButton = $('#nextButton');
	
	// 현재 index에 따라 버튼 상태를 업데이트
	
	function updateButtonStats(){
	
		// index가 최소라면 이전 버튼을 비활성화로
		if(currentIndex === minIndex){
			prevButton.addClass('disabled');
		} else {
			prevButton.removeClass('disabled');
		}
		
		// index가 최대라면 다음 버튼을 비활성화로
		if(currentIndex === maxIndex){
			nextButton.addClass('disabled');
		} else {
			nextButton.removeClass('disabled');
		}
		
	}
	
	// 클릭하였을 때의 동작을 처리
	
	prevButton.click(function(e){
		e.preventDefault();
		toRight();
	});
	nextButton.click(function(e){
		e.preventDefault();
		toLeft();
	});
	
	
	updateButtonStats(); // 초기 상태의 버튼 표시를 업데이트
	
	// ===============================================
	// 인덱스 변경 관리 프로세스
	// ===============================================
	
	// 다음 인덱스로 변경
	
	function updateIndex(nextIndex){
	
		// 허영 범위 밖이라면 아무것도 하지 않음
		if(nextIndex < minIndex) { return; }
		if(nextIndex > maxIndex) { return; }
		
		// 다음index를 현재의 index로 취급
		currentIndex = nextIndex;
		
		// 각 버튼을 업데이트
		updateTitle();
		updateButtonStats();
		slideCalendar();
		
	}
	
	// 왼쪽へ
	function toLeft(){
		updateIndex(currentIndex + 1);
	}
	// 오른쪽へ
	function toRight(){
		updateIndex(currentIndex - 1);
	}
	
	// ===============================================
	// 스와이프에 관한 처리
	// ===============================================
	
	// 좌표를 저장하기 위한 변수
	var startX, currentX, startY, currentY;
	
	var sleeping = false; // 스와이프 감지 멈춤 플러그
	var touching = false; // 터치 여부
	var horizontalSwipe = false; // 가로 방향 스와이프 여부
	var verticalSwipe = false; // 세로 방향 스와이프 여부

	// 스와이프 방향 감지
	
	function checkSwipeDirection() {
		// 스와이프 시작점 보다 10px 이상 아래로 이동하면 수직 이동
		if((startY + 10) < currentY) {
			verticalSwipe = true;
			return;
		}
		if((startY - 10) > currentY) {
			verticalSwipe = true;
			return;
		}
		// 스와이프 시작점 보다 5px 좌우로 이동하면 수평 이동
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
	
		// 스와이프 방향이 검색되지 않은 경우 방향을 확인
		if(!verticalSwipe && !horizontalSwipe){
			checkSwipeDirection();
			
			// 만약 가로 방향 스와이프이면 스크롤 중지
			// （touchstart가 touchmove로 preventDefault하면 스크롤 중지）
			if(horizontalSwipe) {
				event.preventDefault();
			}
			// 세로 방향 스와이프이면 일반 화면 스크롤로 판단하고
			// 다른 스와이프 감지
			if(verticalSwipe) {
				sleeping = true;
			}
		}
		
		// 좌우로 스와이프가 발생하면 체크
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

	// touchmove 이벤트의 처리
	
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
	
	// touchend, touchcancel 이벤트의 처리
	
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
