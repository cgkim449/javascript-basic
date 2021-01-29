코어 자바스크립트

자바스크립트 기본

# 2.1 Hello, world!
- 스크립트를 별도의 파일에 작성하면 브라우저가 스크립트를 다운받아 캐시에 저장한다. 그래서 여러 페이지에서 동일한 스크립트를 사용하는 경우, 브라우저가 페이지가 바뀔 때마다 스크립트를 새로 다운받지 않고 캐시로부터 가져와 사용하면 되기 때문에 트래픽이 절약되고 웹 페이지의 실제 속도가 빨라진다.

# 2.2 코드 구조
## 문
- 예) alert('Hello');
- 문은 ;로 구분한다
    - ;는 줄바꿈으로 생략 가능하나 그냥 늘 사용하는 것이 안전하다.
        - 예) 자바스크립트는 [...] 앞에는 세미콜론이 없다고 가정하기 때문에 이런 경우 불상사가 발생한다.
        ```javascript
        alert("에러가 발생합니다.")
        [1, 2].forEach(alert)
        ```
## 주석
- //, /* */, '<!-- -->' (html 주석도 가능함)

# 2.3 "use strict" 엄격모드
- 코드에서 클래스와 모듈을 사용하면 "use strict"가 자동으로 적용되기 때문에 생략해도 된다.
- 브라우저 콘솔에는 기본적으로 "use strict"가 적용되어있지 않다. 콘솔에서 "use strict"를 입력한 후 Shift+Enter키를 눌러 스크립트를 입력하자.

# 2.4 변수, 상수
- 모던 자바스크립트 압축기(minifier)와 브라우저는 코드 최적화를 잘해준다. 변수를 추가한다고 해서 성능 이슈가 생기지 않는다. 기존 변수를 재사용하기보단 새로운 변수를 선언하자.
## 변수 : let
- let으로 변수를 선언한다.
    - 선언은 한번만 할수있다. 그 이상은 에러뜸.
        - var는 아님.
- 한 변수의 값을 다른 변수에 복사할 수 있다.
```javascript
    let Hello = 'Hello world!';
    let message;

    message = Hello;
    alert(message);
    alert(Hello);
```
- 함수형 언어(functional)
    - 변수에 값이 일단 할당되면 그 값을 절대 바꿀 수 없다(재할당할 수 없다). 
    - 다른 값을 메모리에 저장하고 싶으면 새 변수를 선언할 수 밖에 없다. 기존 변수를 재사용할 수 없다.
    - 스칼라(Scala), 얼랭(Erlang) 등이 있다.
    - 병렬 계산(parallel computation) 같은 영역에선 이런 제약이 장점으로 작용한다.
- 변수 명명 규칙
    1. 오직 문자, 숫자, $, _ 만 들어갈 수 있다.
    2.  첫글자에 숫자 못씀.
    ```javascript
    let $ = 1;
    let _ = 2;
    alert($ + _); // 3
    ```
## 상수 : const
### 대문자 상수
- 런타임 이전에 이미 값을 알고 있는 상수.
- 대문자 상수는 ‘하드 코딩한’ 값의 별칭을 만들 때 사용하면 된다?
- 대문자와 _를 사용해서 명명하자
### 일반적인 상수
- 런타임 과정에서 계산되지만 최초 할당 이후 값이 변하지 않는 상수.
```javascript
const pageLoadTime = /* 웹페이지를 로드하는데 걸린 시간 */;
// 페이지가 로드되기전에는 정해지지않기 때문에 대문자 상수가 아닌 일반적인 상수로 선언한다.
```

# 2.5 자료형 8가지
## typeof 연산자
1. 연산자: typeof x
2. 함수: typeof(x)

```javascript
typeof Math // "object" : 내장객체는 객체형이다
typeof null // "object" : 언어자체의 오류, 하위 호환성을 유지하기 위해 이런 오류를 수정하지 않고 남겨둔 상황
typeof alert // "function" : 마찬가지로 하위 호환성을 유지하기 위해. 근데 유용하게 씀!
```

## 원시형
### 숫자형
- 특수 숫자 값(special numeric value) : infinity, -infinity, NaN
    - NaN : 계산 중에 에러가 발생했다는 뜻
        - 연산 과정 어디에선가 NaN이 반환됐다면 전체 결과에 영향을 준다
        (NaN에 어떤 연산을 추가로 해도 계속 NaN이기 때문이다.)
- ±2^53
### bigint
- 길이 제약 없이 정수를 나타낼 수 있다.
### 문자형
1. ''
2. ""
3. ``
### 불린형
### null
- 다른 언어와 성격이 다르다. 다른 언어에선 null을 '존재하지 않는 객체에 대한 참조’나 '널 포인터(null pointer)'를 나타낼 때 사용한다. 자바스크립트에선 ‘존재하지 않는(nothing)’ 값, ‘비어 있는(empty)’ 값, ‘알 수 없는(unknown)’ 값을 나타내는 데 사용한다.
### undefined
### 심볼
- 객체의 고유 식별자를 만들 때 사용한다.
## 객체형
### 객체

# 2.6 alert, prompt, confirm : 모달
- 모달 창이 떠 있는 동안은 스크립트의 실행이 일시 중단된다. 사용자가 창을 닫기 전까진 나머지 페이지와 상호 작용이 불가능하다.
- 모달 창의 위치는 브라우저가 결정하는데, 대개 브라우저 중앙에 위치한다.
모달 창의 모양은 브라우저마다 다르다. 개발자가 창의 모양을 수정할 수 없다.

- alert("Hello");
- result = prompt(title, [default]); 
    - 취소나 Esc 누르면 null을 반환
    - 매개변수에 [...]는 이 매개변수가 필수가 아닌 선택이라는 뜻.
    - 인터넷 익스플로러에선 default를 꼭 주자.(" "로 줘라)
- result = confirm(question);
    - 확인 누르면 true, 취소나 Esc 누르면 false를 반환한다.

# 2.7 원시형의 형 변환(객체의 형변환은 뒤 챕터에서)

- 함수와 연산자에 전달되는 값은 대부분 적당한 자료형으로 자동 변환된다!
    - 예) alert가 파라미터로 받은 값의 타입과 관계없이 문자열로 자동 변환해서 보여줌,  
    수학 관련 함수, 표현식에서 자동으로 일어남  

> String(), Number(), Boolean() 함수로 세 타입 다 명시적으로 변환 가능하다 
- 숫자형 값를 사용해 무언가를 하려고 하는데 그 값을 문자 기반 폼(form)을 통해 입력받는 경우엔, 이런 명시적 형 변환이 필수이다

## 문자형으로 변환
- 무언가를 출력할 때 주로 일어난다
- alert(value)에서 alert는 파라미터를 문자형으로 받아야한다. value가 문자형이 아니면 자동으로 문자형으로 변환된다

## 숫자형으로 변환
- 수학 관련 연산, 함수, 표현식에서 자동으로 일어남
    - 예) alert( "6" / "2" ); // 3
- 규칙
    - undefined -> NaN
    - null -> 0
    - true, false -> 1, 0
    - string -> 문자열의 처음과 끝 공백 제거 후 남아있는 문자열이 없다면 0, 그렇지 않다면 문자열에서 숫자를 읽음. 변환에 실패하면 NaN이 됨.
    ```javascript
    alert( Number("   123   ") ); // 123
    alert( Number("123z") );      // NaN ("z"를 숫자로 변환하는 데 실패함)
    alert( Number(true) );        // 1
    alert( Number(false) );       // 0
    ```

## 불린형으로 변환
- 논리 연산 수행할때 자동 변환 발생(논리연산은 뒤 챕터에서)
    - 숫자 0, 빈 문자열, null, undefined, NaN과 같이 직관적으로도 “비어있다고” 느껴지는 값들은 false. 나머지는 true
        - 주의 : 문자열 "0", " "은 true이다. PHP 등 일부 언어에선 "0"이 false다  

# 2.8 기본 연산자와 수학
## 수학
- +, -, *, /, %, **(거듭제곱)
    - 예)   
    alert( 4 ** (1/2) ); // 2  
    alert( 8 ** (1/3) ); // 2  
```javascript
    alert(2 + 2 + '1' ); // 41
```

```javascript
// 숫자에는 아무런 영향을 미치지 않는다
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

// 숫자형이 아닌 피연산자는 숫자형으로 변화한다 : Number(...)와 동일하다
// 개발을 하다 보면 문자열을 숫자로 변환해야 하는 경우가 자주 생긴다. HTML 폼(form) 필드에서 값을 가져왔는데 그 값이 문자형일 때 같이 말이다. 실제로 폼에서 가지고 온 값은 대개 문자열 형태이다.
alert( +true ); // 1
alert( +"" );   // 0
```

## 연산자 우선순위

- 17 단항덧셈+  
- 17 단항부정-  
- 16 지수 **  
- 15 곱셉 *  
- 15 나눗셈 /  
- 13 덧셈 +  
- 13 뺄셈 -  
- 3 할당 =  

## 할당 연산자는 값을 반환한다!

- 그렇지만 이런식으로 짜지말자
```javascript
let a = 1;
let b = 2;

let c = 3 - (a = b + 1);

alert( a ); // 3
alert( c ); // 0
```

- 체이닝 : 이런식으로 짜지말자
```javascript
let a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

## 비트연산자 : 쓸일없다
- 인수를 32비트 정수로 변환하여 이진 연산을 수행한다
    - &, |, ^, ~, <<, >>, >>>

## 쉽표연산자 : 쓸일없다
```javascript
let a = (1 + 2, 3 + 4);

alert( a ); // 7 (3 + 4의 결과)
```
```javascript
// 한 줄에서 세 개의 연산이 수행됨
for (a = 1, b = 3, c = a * b; a < 10; a++) {
 ...
}
```

## 퀴즈
- 형변환
```javascript
"" + 1 + 0
"" - 1 + 0
true + false
6 / "3"
"2" * "3"
4 + 5 + "px"
"$" + 4 + 5
"4" - 2
"4px" - 2
7 / 0
"  -9  " + 5
"  -9  " - 5
null + 1
undefined + 1
" \t \n" - 2
```
- 답
```javascript
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

# 2.9 비교연산자

## 문자열끼리 비교
- 사전순(정확히는 유니코드 순)으로 비교한다, 그래서 a가 A보다 크다
```javascript
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

## 다른 형을 가진 값 간의 비교
- 숫자형!으로 바꿔서 비교한다
```javascript
alert( '2' > 1 ); // true
alert( '01' == 1 ); // true
alert( true == 1 ); // true
alert( false == 0 ); // true

let a = 0;
alert( Boolean(a) ); // false
let b = "0";
alert( Boolean(b) ); // true
alert(a == b); // true!
```

## == 와 ===(!= 와 !==)
```javascript
alert( 0 == false ); // true
alert( '' == false ); // true

alert( 0 === false ); // false : 자료형 검사까지하기 때문이다
```

## null이나 undefined와 비교하기
```javascript
alert( null === undefined ); // false : 당연히 자료형이 서로 다르니까
alert( null == undefined ); // true : null -> 0, undefined -> NaN이지만 동등! 연산자는 null과 undefined를 '각별한 커플’처럼 취급한다고 한다.
```

```javascript
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true  
// 3은 당연한거고
// 2는 동등연산자가 좀 특이하기 때문이다
// 동등 연산자 ==는 피연산자가 undefined나 null일 때 형 변환을 하지 않는다.
// undefined와 null을 비교하는 경우에만 true를 반환하고, 그 이외의 경우
// (null이나 undefined를 다른 값과 비교할 때)는 무조건 false를 반환
```

```javascript
// undefined를 다른 값과 비교해서는 안된다.
// undefined -> NaN이기때문에 아래결과들이 당연한것.
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

### 그래서 함정을 피해야한다
- 일치 연산자 ===를 제외한 비교 연산자의 피연산자에 undefined나 null이 오지 않도록 특별히 주의하자
- 또한, undefined나 null이 될 가능성이 있는 변수가 >= > < <=의 피연산자가 되지 않도록 주의하자.  
명확한 의도를 갖고 있지 않은 이상 말이다.  
만약 변수가 undefined나 null이 될 가능성이 있다고 판단되면, 이를 따로 처리하는 코드를 추가하자  

## 퀴즈
```javascript
5 > 4
"apple" > "pineapple"
"2" > "12"
undefined == null
undefined === null
null == "\n0\n"
null === +"\n0\n"
```

## 답
```javascript
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true // 문자열이니까 사전순(2가 1보다 뒤에 오니까)
undefined == null → true
undefined === null → false
null == "\n0\n" → false // null은 오직 undefined와 같다
null === +"\n0\n" → false
```

# 2.10 if와 '?'를 사용한 조건 처리
- 다중 '?'
```javascript
let age = prompt('나이를 입력해주세요.', 18);

let message = (age < 3) ? '아기야 안녕?' :
  (age < 18) ? '안녕!' :
  (age < 100) ? '환영합니다!' :
  '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!';

alert( message );

// 위와 아래는 같다 가독성을 위해 아래 방식을 쓰자
if (age < 3) {
  message = '아기야 안녕?';
} else if (age < 18) {
  message = '안녕!';
} else if (age < 100) {
  message = '환영합니다!';
} else {
  message = '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!';
}
```

# 2.11 논리 연산자
- ||, &&, ! 이 세개가 있다
- '논리' 연산자지만 피연산자로 불린형만이 아니라 모든 타입을 받을 수 있다, 그리고 연산 결과 역시 모든 타입이 될 수 있다

## ||의 추가기능
- ||의 연산 순서
    - 가장 왼쪽 피연산자부터 시작해 오른쪽으로 나아가며 피연산자를 평가
    - 각 피연산자를 불린형으로 변환한다. 변환 후 그 값이 [true이면] 연산을 멈추고 해당 피연산자의 변환 전 원래 값을 반환함.
    - 피연산자 모두를 평가한 경우(모든 피연산자가 [false로평가되는경우])엔 마지막 피연산자를 반환
    - 정리 :  AND 연산자는 첫 번째 [truthy]를 반환한다. 피연산자에 [truthy]가 없다면 마지막 피연산자을 반환한다.
1. 변수 또는 표현식으로 구성된 목록에서 첫 번째 truthy 얻기
 ```javascript
alert( 1 || 0 ); // 1 (1은 truthy임)
alert( null || 1 ); // 1 (1은 truthy임)
alert( null || 0 || 1 ); // 1 (1은 truthy임)
alert( undefined || null || 0 ); // 0 (모두 falsy이므로, 마지막 값을 반환함)

let firstName = "";
let lastName = "";
let nickName = "바이올렛";
alert( firstName || lastName || nickName || "익명"); // 바이올렛
```

2. 단락 평가(short circuit evaluation)
- 위에서 설영했듯이 OR||은 왼쪽부터 시작해서 오른쪽으로 평가를 진행하는데, truthy를 만나면 나머지 값들은 건드리지 않은 채 평가를 멈춘다. 이를 단락평가라고 한다.
```javascript
true || alert("not printed");
false || alert("printed");
```

## &&
- &&의 연산순서(||와 비교해서 보라)
    - ~ 
    - ~ [false이면] ~
    - ~ [true로평가되는경우] ~
    - 정리 :  ~ [falsy] ~. ~ [falsy] ~.
- 주의 : &&가 ||보다 우선순위 높음

## !
- !! 하면 값을 불린형으로 바꿀수있다
```javascript
alert( !!"non-empty string" ); // true
alert( !!null ); // false
// 이때, 첫 번째 NOT 연산자는 피연산자로 받은 값을 불린형으로 변환한 후 이 값의 역을 반환하고, 두 번째 NOT 연산자는 첫 번째 NOT 연산자가 반환한 값의 역을 반환한다. 
// 내장함수 Boolean()을 쓴거랑 같다.
```
- !은 모든 논리연산자중에 우선순위 가장 높음

## 예제
```javascript
alert( null || 2 || undefined );
```

```javascript
alert( alert(1) || 2 || alert(3) );
```

```javascript
alert( 1 && null && 2 );
```

```javascript
alert( alert(1) && alert(2) );
```

```javascript
alert( null || 2 && 3 || 4 );
```

# 2.12 null 병합 연산자 '??'
- 스펙에 추가된 지 얼마 안 된 문법. 구식 브라우저는 폴리필??이 필요.

- null 병합 연산자(nullish coalescing operator) ??를 사용하면 짧은 문법으로 여러 피연산자 중 그 값이 ‘확정되어있는’ 변수를 찾을 수 있다.

- x = a ?? b의 평가 결과
    - a가 null이나 undefined가 아니면 a, 그 외의 경우는 b
    - x = (a !== null && a !== undefined) ? a : b; 와 같다.

```javascript
// null 병합 연산자 ??를 사용하면 값이 정해진 변수를 간편하게 찾아낼 수 있습니다.
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// null이나 undefined가 아닌 첫 번째 피연산자
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## '??'와 '||'의 차이
- ||는 첫 번째 truthy 값을 반환한다
- ??는 첫 번째 정의된(defined) 값을 반환합니다.
> null과 undefined, 숫자 0을 구분 지어 다뤄야 할 때 이 차이점은 매우 중요한 역할을 함.

```javascript
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
// 즉, 높이처럼 0이 할당될 수 있는 변수를 사용해 기능을 개발할 땐 ||보다 ??가 적합하다
```

## 연산자 우선순위
- ??의 연산자 우선순위는 5로 꽤 낮다
    - ??는 =와 ? 보다는 먼저, 대부분의 연산자보다는 나중에 평가됨.
    - 그래서 복잡한 표현식 안에서 ??를 사용해 값을 하나 선택할 땐 괄호를 추가하는 게 좋다.
    ```javascript
    let height = null;
    let width = null;

    // 괄호를 추가!
    let area = (height ?? 100) * (width ?? 50);

    alert(area); // 5000
    ```
- 안정성 관련 이슈 때문에 ??는 &&나 ||와 함께 사용하지 못한다!
    - 제약을 피하려면 괄호를 사용하라
    ```javascript
    let x = (1 && 2) ?? 3; // 제대로 동작한다
    alert(x); // 2
    ```
## 요약
- ??를 사용하면 피연산자 중 ‘값이 할당된’ 변수를 빠르게! 찾을 수 있다.
    - ??는 변수에 기본값을 할당하는 용도로 사용할 수 있다. 
    ```javascript
    // height가 null이나 undefined인 경우, 100을 할당
    height = height ?? 100;
    ```

# 2.13 while, for
```javascript
let i = 3;
while (i) { // i가 0이 되면 조건이 falsy가 되므로 반복문이 멈춤
  alert( i );
  i--;
}
```

```javascript
let sum = 0;

while (true) {

  let value = +prompt("숫자를 입력하세요.", '');

  if (!value) break; // (*)

  sum += value;

}
alert( '합계: ' + sum );
```

# 2.14 switch문
```javascript
let a = "1";
let b = 0;

switch (+a) {
  case b + 1:
    alert("표현식 +a는 1, 표현식 b+1는 1이므로 이 코드가 실행됩니다.");
    break;

  default:
    alert("이 코드는 실행되지 않습니다.");
}
```

```javascript
let a = 3;

switch (a) {
  case 4:
    alert('계산이 맞습니다!');
    break;

  case 3: // (*) 두 case문을 묶음
  case 5:
    alert('계산이 틀립니다!');
    alert("수학 수업을 다시 들어보는걸 권유 드립니다.");
    break;

  default:
    alert('계산 결과가 이상하네요.');
}
```

## 자료형에 주의하라 - prompt는 문자열을 리턴함
```javascript
let arg = prompt("값을 입력해주세요.");
switch (arg) {
  case '0':
  case '1':
    alert( '0이나 1을 입력하셨습니다.' );
    break;

  case '2':
    alert( '2를 입력하셨습니다.' );
    break;

  case 3:
    alert( '이 코드는 절대 실행되지 않습니다!' );
    break;
  default: // 얘가 실행된다
    alert( '알 수 없는 값을 입력하셨습니다.' );
}
```
- ==는 피연산자를 숫자로 자동변환해준ㄴ다?
- +는 숫자로 변환해준다

# 2.15 함수

## 함수 선언
```javascript
function name(parameters) {
  alert('안녕하세요!');
}
```

## 매개변수의 기본값
- 매개변수에 값을 전달하지 않으면 그 값은 undefined가 된다.
- 이때, undefined가 되지 않게하려면 기본값을 설정해주면 된다.
  ```javascript
  function showMessage(from, text = "no text given") {
    alert( from + ": " + text);
  }
  ```
- 아래와 같이 복잡한 표현식도 기본값으로 설정할 수 있다.
  ```javascript
  function showMessage(from, text = anotherFunction()) {
    // 이때, anotherFunction()은 text값이 없을 때만 호출된다.
    // anotherFunction()의 반환값이 text의 값이 된다.
  }
  ```
- 물론 몸체 안에서 기본값을 설정할 수 도 있다.
  ```javascript
  function showMessage(text) {
  if (text === undefined) {
    text = '빈 문자열';
  }

  alert(text);
  }
  ```
  ```javascript
  showMessage(); // 빈 문자열

  // 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 변수에 '빈 문자열'이 할당됩니다.
  function showMessage(text) {
  text = text || '빈 문자열';
  ...
  }
  ```
  ```javascript
  // 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 변수에 '빈 문자열'이 할당됩니다.
  function showMessage(text) {
  text = text || '빈 문자열';
  ...
  }
  ```

## 반환
- return문이 없는 함수도 무언가를 반환하는데, undefined가 그것이다.
- return 지시자만 있는 함수도 undefined를 반환한다.

### 주의 : return과 값 사이에 절대 줄을 삽입하면 안됨
- 자바스크립트는 return문 끝에 세미콜론을 자동으로 넣기 때문
```javascript 
  // 얘처럼 하자
  return (
    some + long + expression
    + or +
    whatever * f(a) + f(b)
    )
```

## 함수는 동작 하나만 담당해야 합니다.
- getAge 함수는 나이를 얻어오는 동작만 수행해야 한다 alert 창에 나이를 출력해주는 동작은 이 함수에 들어가지 않는 것이 좋다.


# 2.16 함수 표현식
- 자바스크립트는 함수를 특별한 종류의 값으로 취급한다. 다른 언어에서처럼 "특별한 동작을 하는 구조"로 취급하지 않는다.
- 함수는 함수 선언 방식 외에도 함수 표현식을 사용해 만들 수 있다.
  ```javascript
    let sayHi = function() {
      alert("Hello");
    }
  ```
- 함수는 값이기 때문에 alert를 이용하여 함수 코드를 출력할 수도 있다.
 ```javascript
 function sayHi() {
  alert( "Hello" );
  }

  alert( sayHi ); // 함수 코드가 보임

 ```
## 콜백 : 함수의 인수로 전달되어 나중에 호출(called back)되는 함수를 콜백이라 한다.

## 선언문 vs 표현식
- 호이스팅
- 스코프 : 함수 선언문은 블록 스코프이다. 

# 2.17 화살표 함수 기본

- 함수 표현식보다 더 단순한 문법
```javascript
  let func = (arg1, arg2, ...argN) => expression
  // 파라미터 arg1..argN을 받는 함수 func
  // func는 => 우측의 표현식을 평가하고 평가 결과를 반환한다
  // 아래 함수의 축약 버전임
```
```javascript
  let func = function(arg1, arg2, ...argN) {
    return expression;
  };
```
- 파라미터가 한개면 괄호 생략 가능
```javascript
  let double = n => n*2;
```
- 파라미터가 없을땐 괄호를 비워둔다
```javascript
  let sayHi = () => alert("안녕하세요!");
```
- 화살표 함수는 함수 표현식과 같은 방법으로 사용할수 있다(아래 예시처럼 함수를 동적으로 만들 수 있다.)
```javascript
  let age = prompt("나이를 알려주세요.", 18);
  let welcome = (age < 18) ?
    () => alert('안녕') :
    () => alert("안녕하세요!");
  welcome();
```
## 본문이 여러줄인 화살표 함수
```javascript
  let sum = (a, b) => {
    let result = a + b;
    return result;
  };

  alert( sum(1,2) ); // 3
```