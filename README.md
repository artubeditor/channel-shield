# Channel Shield

검증된 유튜브 수익창출 채널을 안전하게 거래하기 위한 정적 랜딩 페이지입니다.
구매 전 가능한 채널과 이전 가능 날짜를 먼저 확인하고, 조회수 미달 및 관련/허위 채널 문제에 대한 교체 기준을 합의하는 흐름을 중심으로 구성했습니다.

## 구성

- `index.html`: 페이지 구조, SEO 메타데이터, 구조화 데이터
- `styles.css`: Apple 스타일의 블루 리퀴드 글래스 디자인
- `app.js`: 모바일 메뉴, 구매 옵션 선택, CTA 클릭 이벤트
- `analytics.js`: Google Analytics 4 태그 로더
- `robots.txt`: 검색엔진 수집 허용 및 사이트맵 위치
- `sitemap.xml`: 검색엔진 제출용 사이트맵
- `assets/channel-proof-*.png`: 첫 화면에 사용하는 유튜브 검증 화면 슬라이드 이미지
- `_headers`: Cloudflare Pages 보안 및 캐시 헤더
- `wrangler.toml`: Cloudflare Pages 직접 배포 설정

## Google Analytics

`analytics.js`의 `GA_MEASUREMENT_ID`에 Google Analytics 4 측정 ID를 넣으면 페이지뷰와 CTA 클릭 이벤트가 전송됩니다.

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

## 로컬 미리보기

```bash
python3 -m http.server 8090
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8090/qualitube-apple-pages/
```

## Cloudflare Pages 배포

현재 공개 URL:

```text
https://channel-shield.pages.dev/
```

이 폴더는 빌드가 필요 없는 정적 사이트입니다.

```bash
npx wrangler pages deploy . --project-name channel-shield
```

GitHub 연동으로 배포할 경우:

- Production branch: `main`
- Build command: 비워두기 또는 `exit 0`
- Build output directory: `/`

## 주요 문구

- 먼저 확인하고 판매합니다.
- 문제가 있으면 바로 교체해드립니다.
- 수익창출 채널 35만원, 오픈 이벤트
- 10개 이상 구매 시 5% 할인
- 전자책은 유튜브 채널을 안전하게 지키는 방법 중심으로 안내
