

## Description



## Installation

```bash
# mongo
docker run -d \
  -p 1234:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	-e MONGO_INITDB_ROOT_PASSWORD=secret \
	mongo

# 
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 유용한 라이브러리

[tec]
- class-validator: 입력 데이터의 유효성 검사를 위한 라이브러리로, 데이터 유효성을 간편하게 검증

- scheduling : 작업을 예약하는 데 사용되는 패키지 (시간 기반으로 반복되거나 예약된 작업을 설정하고 관리)

- bull: 백그라운드 작업 및 큐 처리를 위한 라이브러리로, 비동기 작업을 효율적으로 처리

- winston : 로깅을 위한 라이브러리로, 다양한 로그 레벨과 출력 형식을 지원(커스텀)하여 로깅을 관리

- multer: 파일 업로드를 위한 라이브러리로, 이미지나 파일과 같은 멀티파트 데이터를 처리

- Server-Sent Events(sse) : 실시간 데이터 처리가 필요할 때 유용한 패키지

[sec]
- Passport: 인증과 관련된 라이브러리로, 다양한 인증 전략을 구현하여 사용자 인증을 쉽게 처리

- Helmet : 헬멧은 HTTP 응답 헤더를 설정하여 Express 앱을 보호

## 참고하기 좋은 예제
- https://github.com/nestjs/nest/tree/master/sample