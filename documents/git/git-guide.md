# Git 규칙 및 사용법 가이드

## Git 저장소 규칙

1. 브랜치는 main, dev, feature/{{feature 이름}} 브랜치로 나누어 관리하며, 각 개발자들은 필요에 따라 feature 브랜치를 만들어, 작업 완료 후 dev 브랜치에 Merge 하고, 완료된 feature 브랜치는 삭제한다.

2. main 브랜치는 Protected로 직접 Push는 되지 않도록 하며, dev 브랜치의 내용을 필요에 따라 정상작동 하는지 확인 후 Merge 한다.

## Git 사용법

1. git clone

```
git clone {{저장소 주소}}
```

2. 브랜치 생성 [필요한 feature 브랜치가 없는 경우]

```
git branch {{생성할 브랜치 이름}}
```

3. 브랜치 변경

```
git checkout {{이동할 브랜치 이름}}
```

4. 브랜치 내용 dev 브랜치로 Merge

```
// Merge를 시행할 dev 브랜치로 이동
git checkout dev

// Merge 수행
git merge {{Merge할 브랜치 이름}}
```

5. Dev 브랜치의 내용을 feature 브랜치로 Merge 하여 최신화

```
// Merge를 시행할 feature 브랜치로 이동
git checkout {{Feature 브랜치 이름}}

// Merge 수행
git merge dev
```

6. 브랜치 삭제

```
git branch remove {{삭제할 브랜치 이름}}
```
