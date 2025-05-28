import http from 'k6/http';
import { check, sleep } from 'k6';

// 设置并发参数
export let options = {
  vus: 10, // 虚拟用户数
  duration: '1s', // 测试时长
};

const BASE_URL = 'http://localhost:3000'; // 或你的 Docker 宿主机地址
const DEVICE_ID = 'device-123';

export default function () {
  const userId = `user-${Math.floor(Math.random() * 1000)}`;
  const action = Math.random() < 0.5 ? 'read' : 'write';

  if (action === 'write') {
    const payload = JSON.stringify({
      userId,
      action: 'update',
      deviceId: DEVICE_ID,
      metadata: {
        ip: `192.168.0.${Math.floor(Math.random() * 255)}`,
        browser: 'Chrome',
        timestamp: new Date().toISOString(),
      },
    });

    const res = http.post(`${BASE_URL}/audit-log/add/mongo`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'write status is 201': (r) => r.status === 201,
    });
  } else {
    const res = http.get(
      `${BASE_URL}/audit-log/get/mongo?deviceId=${DEVICE_ID}`,
    );

    check(res, {
      'read status is 200': (r) => r.status === 200,
    });
  }

  sleep(0.1); // 小睡防止全量爆发，模拟更真实的流量
}
