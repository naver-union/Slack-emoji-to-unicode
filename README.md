# Slack Emoji to Unicode Converter

> Slack 메시지에 포함된 이모지 shortcode (`:emoji_name:`)를 실제 Unicode 이모지로 변환해주는 간단한 웹 도구입니다.

---

## 기능

- **클릭 & 붙여넣기** — 입력 영역을 클릭 후 Slack 메시지를 붙여넣기만 하면 자동 변환
- **실시간 변환** — 붙여넣기가 감지되는 즉시 shortcode를 Unicode 이모지로 교체
- **결과 편집** — 변환된 텍스트는 오른쪽 영역에서 직접 수정 가능
- **원클릭 복사** — 변환 결과를 클립보드에 바로 복사
- **약 1,900개 이모지 지원** — `emojimap.json`에 매핑된 전체 Slack 공식 이모지 커버

---

## 사용법

### 로컬에서 실행

```bash
git clone https://github.com/haru398801/Slack-emoji-to-unicode.git
cd Slack-emoji-to-unicode

# Python 3
python -m http.server 8000

# 또는 Node.js
npx serve .

# 또는 그냥 브라우저로 index.html 열기
open index.html
```

### 변환 흐름

1. 왼쪽 **"입력"** 영역을 클릭
2. Slack 메시지를 **붙여넣기** (`Ctrl+V` / `Cmd+V`)
3. 오른쪽 **"결과"** 영역에 Unicode 이모지로 변환된 텍스트가 즉시 표시
4. 필요시 결과를 직접 편집한 뒤 **"결과 복사"** 버튼 클릭

---

## 프로젝트 구조

```
Slack-emoji-to-unicode/
├── index.html          # 메인 UI (좌/우 분할 입력·출력 레이아웃)
├── index.js            # 변환 로직 및 이벤트 핸들러
├── emojimap.json       # Slack shortcode → Unicode 이모지 매핑 테이블 (~1,900개)
└── favicon.png         # 사이트 파비콘
```

---

## 기술적 특징

### 입력 제어 트릭

직접 타이핑을 차단하고 **붙여넣기만** 허용하기 위해 아래와 같은 UX 트릭을 사용합니다:

- 화면에 보이는 `#displayInput`은 `readonly` 상태
- 사용자 클릭 시 포커스를 화면 밖에 위치한 `#hiddenInput`으로 토스
- 실제 붙여넣기 이벤트는 `#hiddenInput`에서 수신
- 100ms 딜레이 후 `#hiddenInput` 값을 `#displayInput`에 동기화 및 변환 실행

### 변환 알고리즘

```javascript
const shortcodeRegex = /:[a-z0-9_+-]+:/g;

inputText.replace(shortcodeRegex, (match) => {
    return emojiMap[match] || match;  // 매핑 실패 시 원문 유지
});
```

정규식 `/:[a-z0-9_+-]+:/g`로 shortcode를 탐지하고, `emojimap.json`에서 Unicode 문자로 치환합니다. 매핑에 없는 shortcode는 변환 없이 그대로 출력됩니다.

---

## 지원 범위 & 제보

현재 약 **1,900개**의 Slack 기본 이모지 shortcode가 매핑되어 있습니다.

변환되지 않는 이모지를 발견하셨다면 GitHub Issues에 자유롭게 제보해 주세요.

---

## 라이선스

MIT License (가정 — 원본 리포지토리에 라이선스 파일이 없는 경우 별도 확인 필요)
