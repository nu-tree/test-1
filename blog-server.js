// ============================================
// 🤖 AI 네이버 블로그 자동 생성기 - 서버 (텍스트 전용)
// ============================================
//
// 이 파일은 Node.js 서버입니다.
// 이미지 없이 글만 생성하는 간단한 버전입니다!
//
// 주요 기능:
// 1. HTTP 서버 실행
// 2. HTML 파일 제공
// 3. 글 스타일 분석 API
// 4. 블로그 글 생성 API (텍스트만!)

// ============================================
// 📦 필요한 모듈 불러오기
// ============================================

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// 🔐 환경 변수 로드
// ============================================

function loadEnv() {
  const env = {};
  try {
    const envPath = path.join(__dirname, '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');

    envFile.split('\n').forEach(line => {
      const [key, ...values] = line.split('=');
      if (key && values.length) {
        env[key.trim()] = values.join('=').trim();
      }
    });
  } catch (err) {
    console.error('⚠️  .env 파일을 찾을 수 없습니다.');
  }
  return env;
}

const ENV = loadEnv();
const PORT = 3000;

// ============================================
// 🤖 OpenRouter API 호출
// ============================================
// Claude AI를 사용해서 글을 분석하고 생성합니다.

function callOpenRouter(messages, callback) {
  // TODO: AI한테 물어보기!
  //
  // 질문: "Node.js https.request()로 OpenRouter API 호출하는 코드 작성해줘.
  //       엔드포인트는 https://openrouter.ai/api/v1/chat/completions 이고,
  //       POST 요청에 Authorization 헤더와 JSON body를 보내야 해."
  //
  // 필요한 것:
  // - https.request() 사용
  // - method: 'POST'
  // - headers: { Authorization, Content-Type, Content-Length }
  // - body: { model: 'anthropic/claude-sonnet-4.5', messages }
  // - 응답 받아서 callback(null, responseData) 호출
  // - 에러 나면 callback(error) 호출

  console.log('🤖 TODO: OpenRouter API 호출 구현하기');
  callback(new Error('아직 구현 안 됨'));
}

// ============================================
// 🌐 HTTP 서버
// ============================================

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // ============================================
  // 📄 루트: HTML 파일 제공
  // ============================================
  if (parsedUrl.pathname === '/' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'blog-index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('파일을 찾을 수 없습니다.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // ============================================
  // 📝 API: 글 스타일 분석
  // ============================================
  if (parsedUrl.pathname === '/api/analyze-style' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { referencePosts } = JSON.parse(body);

        // TODO: AI한테 물어보기!
        //
        // 질문: "한국어 블로그 글의 스타일을 분석하는 프롬프트 만들어줘.
        //       반말/해요체/합니다체/한다체를 구분하고,
        //       소제목 개수, 문단 길이, 해시태그 개수도 분석해야 해.
        //       결과는 JSON 형식으로 받을 거야."
        //
        // JSON 형식:
        // {
        //   "tone": "반말/해요체/합니다체/한다체",
        //   "subheadings": "소제목 형태 (예: 3개, 이모지 사용)",
        //   "paragraphLength": "짧음/보통/길게",
        //   "hashtagCount": "5개",
        //   "introFormula": "도입부 패턴 예시",
        //   "closingFormula": "마무리 패턴 예시"
        // }

        const messages = [
          {
            role: 'user',
            content: `TODO: 스타일 분석 프롬프트 작성

참고 글:
${referencePosts}

위 글의 스타일을 분석해주세요.`
          }
        ];

        callOpenRouter(messages, (err, response) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message }));
            return;
          }

          // TODO: AI 응답에서 JSON 추출하기
          // 힌트: response.choices[0].message.content에 JSON이 있을 거예요

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(response);
        });

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: '잘못된 요청' }));
      }
    });
    return;
  }

  // ============================================
  // ✨ API: 블로그 글 생성 (텍스트만)
  // ============================================
  if (parsedUrl.pathname === '/api/generate-post' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { keyword, style, storeInfo } = JSON.parse(body);

        // TODO: AI한테 물어보기!
        //
        // 질문: "네이버 블로그 글을 생성하는 프롬프트 만들어줘.
        //       키워드, 스타일, 가게 정보를 받아서
        //       제목, 본문, 해시태그를 JSON으로 반환해야 해.
        //       본문에는 **별표**로 소제목 표시해야 하고,
        //       분석된 스타일(말투, 문단 길이 등)을 정확히 따라야 해."
        //
        // JSON 형식:
        // {
        //   "title": "제목 (40자 이내)",
        //   "body": "본문 (마크다운 아님, **별표**만 사용)",
        //   "hashtags": ["태그1", "태그2", "태그3"]
        // }

        const messages = [
          {
            role: 'user',
            content: `TODO: 블로그 글 생성 프롬프트 작성

키워드: ${keyword}
스타일: ${JSON.stringify(style, null, 2)}
가게 정보: ${JSON.stringify(storeInfo, null, 2)}

위 정보로 네이버 블로그 글을 작성해주세요.`
          }
        ];

        callOpenRouter(messages, (err, response) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message }));
            return;
          }

          // TODO: AI 응답에서 JSON 추출하기
          // TODO: 제목, 본문, 해시태그 반환

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            title: 'TODO: 제목',
            body: 'TODO: 본문',
            hashtags: ['TODO', '태그']
          }));
        });

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: '잘못된 요청' }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('페이지를 찾을 수 없습니다.');
});

// ============================================
// 🚀 서버 시작!
// ============================================
server.listen(PORT, () => {
  console.log(`\n🚀 네이버 블로그 글 생성기 (텍스트 전용) 시작!`);
  console.log(`📱 브라우저에서 열기: http://localhost:${PORT}`);
  console.log(`\n.env 파일 상태:`);
  console.log(`  - OPENROUTER_API_KEY: ${ENV.OPENROUTER_API_KEY ? '✅ 설정됨' : '❌ 없음'}`);
  console.log(`\n💡 이미지 생성도 하고 싶다면?`);
  console.log(`   → blog-server-with-image.js 사용하세요!`);
  console.log(`\n종료하려면 Ctrl+C를 누르세요.\n`);
});
