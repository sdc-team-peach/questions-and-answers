import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const getQuestionsRes = http.get('http://localhost:3001/questions?product_id=5');
  check(getQuestionsRes, {
    'res status is 200 product_id = 5': r => r.status === 200
  });
}