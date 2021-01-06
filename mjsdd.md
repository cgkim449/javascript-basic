# 3장 : 개발환경
## 3.4.3 Code Runner 확장 플러그인
ctrl+alt+n : VS Code에서 현재 표시중인 자바스크립트 파일 실행

# 4장 : 변수
- 함수는 [값]이다. 함수는 객체다.
- var은 함수스코프라는 치명적인 단점이 있다
- 변수 선언 과정
    - 선언
    - 초기화 : undefined로 초기화 
    - 변수이름/값(key/value)로 실행 컨텍스트에 [객체]로 보관됨

## 4.5 값의 할당
- 값을 할당할 때는 기존 값을 바꾸는게 아니라 새로운 메모리를 확보해서 거기다가 새 값을 할당함
- 변수 선언은 런타임 이전에 먼저 실행되고, 값 할당은 런타임에 실행됨, 런타임에는 소스코드가 순차적으로 실행된다

# 5장 

- - - - - - - - - - - - 

# 4장 : 변수
- 자바스크립트에서 함수는 [값]이다
- var은 여러 단점이 있다. 그 중 가장 대표적인 것이 블록레벨 스코프를 지원하지 않고 함수레벨 스코프를 지원한다는 것이다. 이로 인해 의도치 않게 전역 변수가 선언되어 심각한 부작용이 발생하기도 한다. let과 const가 도입된 이유는 var의 여러 단점을 보완하기 위해서다.
- 변수 선언 2단계
    - 선언 단계 : 변수 이름을 실행 컨텍스트(execution context)에 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.
    - 초기화 단계 : 자바스크립트 엔진에 의해 undefined라는 값이 암묵적으로 할당되어 초기화된다. undefined는 자바스크립트에서 제공하는 원시 타입의 값(primitive value)이다. 변수 이름과 변수 값은 실행 컨텍스트 내에 키key/값value 형식인 [객체]로 등록되어 관리된다.
## 4.5 값의 할당
- 변수 선언은 (소스코드가 순차적으로 실행되는)런타임 이전에 먼저 실행되지만, 값의 할당은 런타임에 실행된다.
    - 예)
        ```javascript
        console.log(score); // undefined
        var score=80; // 선언 + 할당 : 선언과 할당을 하나의 문장으로 표현해도 자바스크립트의 엔진은 2개의 문으로 나누어 각각 실행함.
        console.log(score); // 80
        ```
- 값을 할당할때는 undefined가 저장되있던 메모리 공간에 할당하는게 아니라 새로운 메모리 공간을 확보하고 할당한다. undefined는 가비지 콜렉터에 의해 메모리에서 자동 해제된다.

# 5장 : 표현식과 문
## 5.1 값
- 값(value)는 표현식이 평가되어 생성된 결과이다. 
- 모든 값은 데이터 타입을 가지며, 메모리에 2진수, 즉 비트의 나열로 저장된다.
    - 예) 0100 0001을 숫자로 해석하면 65지만, 문자로 해석하면 A이다.
- 변수는 값이다. 함수도 값이다.
## 5.2 리터럴
- 리터럴이란 값을 생성하기 위해 미리 약속한, 사람이 이해할 수 있는 표기법이다.
    - 사람이 이해할 수 있는 표기법이란 :아라비아숫자, 알파벳, 한글, 기호('',"",.,[],{},// 등) 등
    - 예) 정수 리터럴, 부동소수점 리터럴, 2진수 리터럴, [null]리터럴, [undefined] 리터럴,
     [객체] 리터럴, [배열] 리터럴, [함수] 리터럴, [정규표현식] 리터럴 등
## 5.3 표현식
- 리터럴 표현식, 식별자 표현식, 연산자 표현식, 함수/메서드 호출 표현식 등 값으로 평가될 수 있는 문은 모두 표현식이다.
    - 예) 
    ```javascript
    // 리터럴 표현식
    10
    'Hello'

    // 식별자 표현식
    sum
    person.name
    arr[1]

    // 연산자 표현식
    10+20
    sum=10
    sum!==10

    // 함수/메서드 호출 표현식
    square()
    person.getName()
    ```
## 5.4 문
- 문은 프로그램을 구성하는 기본 단위이자 최소 실행 단위다. 문의 집합으로 이뤄진 것이 프로그램이다.
- 문은 여러 토큰으로 구성된다. 토큰이란 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소이다.
- 문은 선언문, 할당문, 조건문, 반복문 등으로 구분할 수 있다.

## 5.6 표현식인 문과 표현식이 아닌 문
- 구분하고 싶다면 변수에 할당해보면 간단하게 알 수 있다.
    - 예) 
    var foo = var x; // X
    var foo = x = 100; // 표현식인 문은 값처럼 사용할 수 있다

# 6장 : 데이터 타입 
- 원시타입(숫자,문자열,불리언,undefined,null,심벌), 객체타입(객체,함수,배열 등)으로 나뉜다
## 6.10.2 동적 타입 언어와 변수
- 변수는 꼭 필요한 경우에 한해 제한적으로 사용한다
- 변수의 유효 범위(스코프)는 최대한 좁게 만들어 변수의 부작용을 억제해야한다
- 전역 변수는 최대한 사용하지 않도록 한다
- 변수보다는 상수를 사용해 값의 변경을 억제한다

# 7장 : 연산자

# 8장 : 제어문
- 자바스크립트는 배열을 순회할 때 사용하는 forEach 메서드, 객체의 프로퍼티를 열거할 때 사용하는 for...in문, 이터러블을 순회할 수 있는 for...of문과 같이 반복문을 대체할 수 있는 다양한 기능을 제공한다.

# 9장 : 타입 변환과 단축 평가
- 암묵적 타입 변환 : 문맥상으로 판단
- 명시적 타입 변환
    - 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법
    - 빌트인 메서드를 사용하는 방법
    - 암묵적 타입 변환을 이용하는 방법
## 9.4 단축 평가
- 단축 평가에는 유용한 패턴이 있다
    - 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할때
    - 함수 매개변수에 기본값을 설정할때

# 10장 : 객체 리터럴
# 10.1 객체란?
- 프로퍼티의 집합이다. 이처럼 객체는 상태와 동작을 하나의 단위로 구조화할 수 있어 유용하다.
var person = {
    name: 'Lee',
    age: 20
};

var counter = {
    num: 0,
    increase: function () {
        this.num++;
    }
};

## 10.2 객체 리터럴에 의한 객체 생성 : 숫자값이나 문자열을 만드는 것과 유사하게 리터럴!로 객체를 생성한다!
- 자바스크립트는 프로토타입 기반 객체지향 언어로 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원한다. 이 중 가장 간단한 방법은 객체 리터럴을 사용하는 방법이다.
    - 객체 리터럴

    - Object 생성자 함수
    - 생성자 함수
    - Object.create 메서드
    - 클래스(ES6)

# 11 : 원시 값과 객체의 비교
## 11.1 원시값
## 11.1.2 문자열과 불변성
- 자바스크립트는 자바와 다르게 원시타입인 문자열을 제공한다!!!
    - 근데 문자열은 유사 배열 객체이면서 이터러블이므로 배열과 유사하게 각 문자에 접근할 수 있다
        - 유사 배열 객체란 마치 배열처럼 [인덱스]로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다
    - 즉 문자열은 원시타입이면서 객체타입도 될 수 있는것이다. 문자열 뿐만 아니라 원시값은 객체처럼 사용하면 원시값을 감싸는 래퍼 객체로 자동 변환된다.
## 11.1.3 값에 의한 전달

```javascript
var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy); // 80

score = 100;

console.log(score); // 100
console.log(copy); // ?
```
- 자바스크립트와 파이선의 차이점
    - 자바스크립트는 var copy = score에서 새로운 80을 생성해서 그 주소를 copy에게 전달함, 그래서 copy, score가 각각 다른 주소의 80을 바라봄
        - 중요한 것은 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당해도 서로 간섭할 수 없다는 것이다.
    - 파이선은 score이 갖고 있는 주소값을 그대로 copy에게 줌, 그래서 둘이 같은 80을 바라봄
## 11.2 객체
- 자바같은 클래스 기반 객체지향 프로그래밍 언어는 사전에 정의된 클래스를 기반으로 객체를 생성한다. 다시 말해 객체를 생성하기 이전에 이미 프로퍼티와 메서드가 정해져있으며 생성 이후에는 프로퍼티를 삭제하거나 추가할 수 없다. 하지만 자바스크립트는 객체가 생성된 이후라도 동적으로 프로퍼티와 메서드를 추가할 수 있다!

# 12 : 함수
## 12.3 함수 리터럴
- 함수 리터럴도 리터럴이니까 평가되어 값을 생성하는데 이 값은 객체다. 즉 함수는 객체다!
    - 함수는 일반 객체와는 다르다. 일반 객체는 호출할 수 없지만, 함수는 호출할 수 있다, 그리고 함수만의 고유한 프로퍼티를 갖는다
## 12.4 함수 정의
- 4가지 방식이 있다
    - 함수 선언문
    - 함수 표현식(함수 리터럴)
    - Function 생성자 함수
    - 화살표 함수(ES6)
## 12.4.3 함수 호이스팅
- 함수 호이스팅은 함수를 호출하기전에 반드시 함수를 선언해야 한다는 당연한 규칙을 무시한다. 따라서 함수 선언문 대신 함수 표현식을 사용할 것을 권장한다.