# ex00 들어가면서
- MDN
- console > setting > preserve log 해제
- jsp: 버퍼에 저장됐다가 jsp 종료시 출력
- html 한개가 한개의 어플리케이션 : 웹페이지 한개가 한개의 어플리케이션이다 페이지가 바뀌면 어플리케이션이 바뀐다
- 제이슨은 자바스크립트의 객체 단축표기법을 흉내내서 만든거다
- const 변수, const 객체
    - 객체의 프로퍼티를 못바꾼다는게 아니라 객체의 [주소]를 못바꾼다는것
- 자바스크립트 객체


# ex01 기초
- <script type="text/plain">
    - script의 type 속성이 "text/javascript"로 설정되어 있지 않으면 웹브라우저는 이 태그의 값을 무시한다.    
    -> 화면에 출력하지는 않으면서 특정 목적으로 이용할 때 종종 이런 방식을 사용한다.  
       예) Handlebars 라이브러리
- 스크립트 태그에 선언된 변수/함수의 사용범위는 어플리케이션(웹페이지)이다. 호이스팅은 스크립트 태그 안에서.
- 자바스크립트 코드 실행 순서
    - 위에서 아래로 태그를 읽는다
    - 태그 안에 있는 자바스크립트를 실행하는 중에 오류가 발생하면 [즉시] script 태그의 실행을 중단하고 다음 태그로 간다
- 자바스크립트는 인터프리터방식이기 때문에 실행전까지 코드에 오류가 있다는걸 알수없다 즉 실행하는 시점에 문법검사한다.


# ex02 변수, 배열(exam16~)
## 변수
- 같은 이름의 변수를 var로 중복 선언하더라도 오류가 아니다.(let으로 하면 에러뜸)  
-> 왜? 어차피 객체에 맵 방식으로 값을 저장하기 때문에  
-> 같은 이름을 가진 변수를 또 선언하더라도 기존의 변수 값을 덮어 쓸 뿐이다.   

- let 변수는 로컬 변수이다. window 객체에 보관되지 않는다.
    ```javascript
    let v1 = "홍길동";
    let v2 = 100;
    console.log(window.v1); // undefined
    console.log(window.v2); // undefined
    ```

## 배열
자바스크립트의 배열은 자바의 맵 객체와 유사

### 생성  
- var arr = new Array(); // 빈 객체 생성 -> Object()로 기본 준비 -> Array() 추가 준비  
    1) new -> 빈 객체를 만든다.  
    2) Object() -> 객체에 필요한 최소한의 변수나 함수를 추가한다.  
    -> Array() 함수를 호출하면 내부적으로 Object() 함수를 호출한다.  
    -> 즉 자바의 상속처럼 Array() 생성자는 Object() 생성자를 상속받는다.  
    -> 그래서 Array()를 호출할 때 상위 생성자인 Object()가 호출되는 것이다.  
    3) Array() -> 배열 관리에 필요한 변수나 함수를 기본 객체에 추가한다.  

- 단축문법 : var arr = ["aaa", "bbb", true, 100, new Object(), function() {}]; 

- 자바와 달리 배열 인덱스의 유효 범위를 넘어가도 예외는 발생하지 않는다. undefined 뜸.  
- 자바와 달리 배열을 만들 때 크기를 결정하지 않는다. 배열에 추가된 값에 따라 배열 크기(length)가 결정된다.  
-> 자바의 ArrayList와 비슷하게 동작한다.  
-> 단 자바의 ArrayList와 다른 점은 대괄호 []를 이용하여 배열 값을 넣을 수 있다.  

### 반복문 for
- for(;;)
- for(... in 객체) : 모든 객체가 사용가능
    - 값이 아닌 프로퍼티를 꺼낸다(반복문으로 꺼낼수있도록 허가된 프로퍼티만 꺼낼수있다, 즉 Object() 생성자가 추가한 프로퍼티는 꺼낼 수 없다)
        - Array : 인덱스를 꺼낸다
        - 객체 : 프로퍼티를 꺼낸다    
- for(... of iterable객체) : iterable 객체만 사용가능(Array, Map)
    - 값을 꺼낸다
        - Array : 값을 꺼낸다
        - Map : 배열을 꺼낸다
        ```javascript
        var obj2 = new Map();
        obj2.set("name", "홍길동");
        obj2.set("age", 20);
        obj2.set("tel", "1111-1111");
        obj2.set("working", true);

        for (var x of obj2) { 
        // x는 배열이다.
        // x[0]은 key, x[1]은 value이다. 
        console.log(x);
        console.log(x[0], "=", x[1]);
        }

        // destructuring 문법을 사용하여 key와 value를 분해하여 받는다.
        for (var [key, value] of obj2) { 
            console.log(key, "=", value);
        }
        ```

### 객체의 구조분해(destructing)
- 받고싶은거만 받을때 사용한다
- 배열은 순서대로 분해하고 객체는 프로퍼티명으로 분해한다


# ex03 함수
## 새 변수, 함수를 선언하는게 아니라 값만 바뀐다
```javascript
    var v1 = 100
    var v1 = true
    var v1 = "hello"
    function f1(a)
    function f1()
    function f1(a,b,c)
    // 그래서 자바스크립트는 함수 오버로딩이라는 개념이 없다
```

## 함수는 내장변수 arguments를 갖고 있다
- arguments는 배열이다
    - 근데 Array()로 만든 배열은 아니기때문에 forEach(), reduce() 등은 갖고 있지 않다. Array()로 만든 배열만 갖고 있다.  
    ```javascript
            arr.forEach(function(value) {
            console.log(value);
        });
    ```  
    - reduce()는 합계 등을 계산할때 유용하다
    - Array.from(arguments); 이렇게하면 정식 배열로 바꿔줄 수 있다

## 함수는 객체다
- 즉 프로퍼티와 코드를 갖고 있는 객체이다
    - 객체 = properties(값, 함수, 객체)
    - function = properties + code  
        (object + function body)  
    참고 : 자바스크립트는 객체지향이 아닌 functional 프로그램 (함수 중심)  
- 객체처럼 자유롭게 쓰자, 파라미터로 넘겨줄땐 보통 cb(콜백)라고 한다
- 함수도 객체니까 자동으로 window 객체에 보관된다
- f1() 뜻: f1함수 객체에 저장된 함수 코드를 실행하라! 함수는 객체 + 코드 일뿐이다!

## 익명함수
### 익명함수를 정의할때 애로우 함수를 사용할 수 있다

### 익명함수 즉시 호출하기
- 함수 정의 즉시 호출하기

### 함수의 호이스팅과 익명함수 (조심!)
- 변수 선언만 호이스팅된다 할당문!은 같이 안올라온다

## 클로저
### 핵심 : 바깥 함수의 로컬변수를 복제
- 그림
- 클로저 : 함수 안에서 정의된 함수(return에 있던 어디에 있던 안에서 정의됐으면 무조건 클로저다)  
근데 클로저가 바깥 함수의 로컬변수(파라미터 등)을 사용한다면  
그럼 알아서 복제해둔다 이게 핵심임  
### 클로저를 객체에 담아 리턴할수있다
- 그림

## 자바스크립트의 글로벌 함수들 
- setTimeout()
    - 일정시간이 경과한 후 특정 함수를 호출하게 할 수 있다
    window.setTimeout(함수, 경과시간);
    window.setTimeout(함수, 5000); // 5초뒤에 호출하라
- setInterval(함수, 경과시간);
    - 일정시간이 경과할 때마다 특정 함수를 계속 호출하게 할 수 있다
- eval
- jasonparse 


# 에이젝스 Asynchronous JavaScript and XML

## 일반요청
```javascript
document.querySelector("#btn1").onclick = () => {
    // 어떻게 클릭했는지 정보가 더 필요하면 파라미터로 받으면 된다
    // 파라미터 저렇게 비워놔도 무조건 한개는 받는다 
	// 웹브라우저가 지정한 URL로 요청을 수행한다.
  window.location.href = "test1.jsp";
};
```
## AJAX - XMLHttpRequest()
```javascript
var ta = document.querySelector("#ta");

document.querySelector("#btn1").onclick = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "test1.jsp", false);
    xhr.send();
    ta.value = xhr.responseText;
};
```
- 이거만 기억
<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>  
<% response.setHeader("Access-Control-Allow-Origin", "*");%>  

## exam2 : GET, POST
- contentType
## exam3 : 무조건 비동기로 해라
readystate==4  
+ status==200 (else {alert("실행 오류 입니다!"); r.value = "";})  
+ 입력폼초기화(dispatchEvent(e))  

## exam4
- 서버에서 일부 html을 가져올때 에이젝스를 쓰면된다(새로운거 없음 걍 연습임)
    - 딱한번만 호출할 함수는 익명함수로 정의 즉시 호출하자
- 서버에서 json 데이터 받아오기
    - json에서 프로퍼티 문자열 ''안됨, ""만. 숫자는 안붙여도됨.
## exam05 : AJAX 라이브러리 만들기 - MyQuery


1. ajax()를 만든다 url, function(result), function 을 넘겨준다
2. 마이쿼리 객체를 만들고(에이젝스 함수가 다른 사람이 만든거랑 중복되지않게 하기위해 만든다 마이쿼리에 에이젝스라는 함수를 등록한다)   
(성공했을때 실행할 함수(result : 서버로부터 받은 데이터), 실패했을때 실행할 함수)  
3. var $ = myQuery;  

- - -
제이쿼리 다시
# exam05 : AJAX 라이브러리 만들기
## exam05-1
### 제이쿼리 쓰는 이유(간결성, 크로스 브라우저)
- 제이쿼리를 쓰면 에이젝스 요청은 $.ajax(); 이러면 끝난다
- 제이쿼리는 크로스브라우저(브라우저마다 어떤 자바스크립트 문법은 되고 안되고 하는걸 해결해줌)를 자동으로 처리해준다


