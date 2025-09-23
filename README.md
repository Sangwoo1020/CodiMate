Codimate 👔
개인 맞춤형 스마트 코디 추천 시스템.

📌 Project Overview
Codimate는 개인 맞춤형 스마트 코디 추천 시스템입니다. 잘 어울리는 상 하의 매칭 부터 날씨 별 , 상황 별 추천 코디까지!

자신의 옷장 사진 업로드로 개인 맞춤!
실시간 날씨에 따라서 코디 추천
잘 어울리는 색상 추천으로 매일 아침 코디 고민 x

🛠️ Tech Stack
Backend
Java 17, Spring Boot 3.x
JPA (Hibernate)
Mysql
Frontend (퍼블리싱)
HTML5, CSS3, JavaScript (Vanilla)
Spring Boot의 Thymeleaf 템플릿 기반
Build & Deploy
Gradle
GitHub Flow 기반 협업

🔀 Git Convention
Branch Strategy (GitHub Flow)
main: 배포 가능한 안정화 브랜치
develop: 기능 통합 브랜치 (MVP 이후 활성화 예정)
feature: feature/{이슈번호}-{기능명}
예) feature/1-user-authentication
📝 Commit Convention
커밋 메시지는 제목 / 본문 / 꼬리말로 나눕니다.

1) 제목
Tag: 제목 형식 사용
첫 글자는 대문자, 콜론 뒤 한 칸 띄우기
예: Feat: 로그인 기능 추가
2) Tag 종류
Tag	설명
Feat	새로운 기능 추가
Fix	버그 수정
Docs	문서 수정
Style	코드 포맷/스타일 변경
Refactor	코드 리팩토링
Test	테스트 코드 추가/수정
Chore	빌드/설정 관련 작업
Merge	브랜치 병합
3) 본문 (선택)
72자 내로 줄바꿈
무엇을, 왜 변경했는지 상세히 작성
4) 꼬리말 (선택)
Type: #이슈번호 형식
예: Fixes: #12
💻 Code Convention
Java
클래스명: PascalCase (UserService, RoomController)
메서드/변수명: camelCase (getUserById, roomList)
상수: UPPER_SNAKE_CASE (MAX_LOGIN_ATTEMPTS)
패키지명: 소문자 (com.moodTrip.spring.chatting)
예외 클래스: PascalCase + Exception (UserNotFoundException)
Database
테이블/컬럼명: snake_case
PK 컬럼명: {table명}_id (user_id, room_id)
공통 컬럼: created_at, updated_at
파일(이미지)은 DB에 직접 저장하지 않고 URL 또는 UUID로 관리
🚀 Getting Started
1) Clone
git clone https://github.com/{your-repo}/Codimate.git
cd Codimate
