import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
}

const randId = Math.floor(Math.random() * 100000);

export default function() {
  const getAnswersRes = http.get(`http://localhost:3001/questions?question_id=${randId}/answers`);
  check(getAnswersRes, {
    'res status is 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
}

// k6 run tests/answersTest.js