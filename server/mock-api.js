const express = require('express');
const app = express();

const PORT = 4000;
const JWT_SECRET = 'sdfalkjwlkj';
const users = [
  {
    id: 'u1',
    email: 'admin@admin.com',
    name: '관리자',
    positions: [],
    password: '1234',
    role: 'admin',
  },
  {
    id: 'u2',
    email: 'test@test.com',
    name: '테스트',
    positions: [
      {
        part: 'frontend',
        experience: 0,
      },
    ],
    password: '1234',
    role: 'developer',
  },
  {
    id: 'u3',
    email: 'test2@test2.com',
    name: '테스트2',
    positions: [
      {
        part: 'frontend',
        experience: 2,
      },
      {
        part: 'backend',
        experience: 5,
      },
    ],
    password: '1234',
    role: 'developer',
  },
  {
    id: 'u4',
    email: 'employer@employer.com',
    name: '고용주',
    positions: [],
    password: '1234',
    role: 'employer',
  },
  {
    id: 'u5',
    email: 'employer@employer2.com',
    name: '고용주2',
    positions: [],
    password: '1234',
    role: 'employer',
  },
];
const recruits = [
  {
    id: 'r1',
    title: '신입 웹 개발자 모집',
    content:
      '저희 개발월드에서 신입 웹 개발자를 모집합니다. 많은 지원 바랍니다. 감사합니다.',
    address: '서울특별시 강남구 서초동',
    positions: [
      {
        part: 'frontend',
        experience: 0,
      },
      {
        part: 'backend',
        experience: 0,
      },
    ],
    salary: 35000000,
    startDate: '2023-07-29',
    endDate: '2023-08-31',
    images: [
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740',
    ],
    user: {
      id: 'u4',
      email: 'employer@employer.com',
      name: '고용주',
      positions: [],
      password: '1234',
      role: 'employer',
    },
    createdAt: '2023-07-29',
    updatedAt: '2023-07-29',
  },

  {
    id: 'r2',
    title: '경력 웹 개발자 모집',
    content:
      '저희 프로개발에서 경력 웹 개발자를 모집합니다. 많은 지원 바랍니다. 감사합니다.',
    address: '경기도 분당시 정자동',
    positions: [
      {
        part: '프론트엔드',
        experience: '3년 이상',
      },
      {
        part: '백엔드',
        experience: '3년 이상',
      },
    ],
    salary: 50000000,
    startDate: '2023-07-29',
    endDate: '2023-08-31',
    images: [
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740',
    ],
    user: {
      id: 'u5',
      email: 'employer@employer2.com',
      name: '고용주2',
      positions: [],
      password: '1234',
      role: 'employer',
    },
    createdAt: '2023-07-29',
    updatedAt: '2023-07-29',
  },
];
const basicLogger = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

// 미들웨어
app.use(express.json());
app.use(basicLogger);

// 토큰 파싱 미들웨어 [임시]
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ success: false, message: '인증 정보가 없습니다.' });
  }

  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res
      .status(401)
      .json({ success: false, message: '인증 토큰이 없습니다.' });
  }

  // 토큰 파싱
  const [_, userIndex, tokenSecret] = tokenValue.split('.');
  const isValidToken = tokenSecret === JWT_SECRET;
  if (!isValidToken) {
    return res
      .status(401)
      .json({ success: false, message: '토큰이 정상적이지 않습니다.' });
  }

  // 토큰 파싱 완료 되면 유저정보 세팅
  req.user = users[userIndex];

  next();
};

// 임시 API
// 로그인
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  const userIndex = users.findIndex((user) => user.email === email);
  if (userIndex < 0)
    return res.json({
      success: false,
      message: '존재하지 않는 아이디입니다.',
    });

  const user = users[userIndex];
  if (user.password != password) {
    return res.json({ success: false, message: '계정 정보를 확인해주세요.' });
  }

  const token = `aaa.${userIndex}.${JWT_SECRET}`;
  res.json({
    success: true,
    message: '로그인에 성공했습니다.',
    data: {
      user,
      token,
    },
  });
});

// 회원가입
app.post('/api/v1/auth/register', (req, res) => {
  const { email, password, name, role = 'developer' } = req.body;

  // 필수 값 확인
  if (!email || !password || !name) {
    return res.json({
      success: false,
      message: '필수 값이 누락되었습니다.',
    });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.json({
      success: false,
      message: '이미 존재하는 아이디입니다.',
    });
  }

  const userIndex = users.length;
  const token = `aaa.${userIndex}.${JWT_SECRET}`;
  const id = `u${userIndex + 1}`;
  const user = {
    id,
    email,
    name,
    password,
    role,
    positions: [],
  };
  users.push(user);

  res.json({
    success: true,
    message: '회원가입에 성공했습니다.',
    data: {
      user,
      token,
    },
  });
});

// 모집글 목록 조회
app.get('/api/v1/recruits', (req, res) => {
  res.json({
    success: true,
    data: {
      recruits,
    },
  });
});

// 모집글 상세
app.get('/api/v1/recruits/:id', (req, res) => {
  const { id } = req.params;
  const recruit = recruits.find((recruit) => recruit.id === id);
  if (!recruit) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  res.json({
    success: true,
    message: '모집글이 조회되었습니다.',
    data: {
      recruit,
    },
  });
});

// 모집글 등록
app.post('/api/v1/recruits', authMiddleware, (req, res) => {
  const {
    title,
    content,
    address,
    salary,
    positions,
    startDate,
    endDate,
    images,
  } = req.body;

  const recruit = {
    id: `r${recruits.length + 1}`,
    title,
    content,
    address,
    salary,
    positions,
    startDate,
    endDate,
    images,
    user: req.user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  recruits.push(recruit);

  res.json({
    success: true,
    message: '모집글이 등록되었습니다.',
    data: {
      recruit,
    },
  });
});

// 모집글 상세 조회
app.get('/api/v1/recruits/:id', (req, res) => {
  const { id } = req.params;
  const recruit = recruits.find((recruit) => recruit.id === id);
  if (!recruit) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  res.json({
    success: true,
    data: {
      recruit,
    },
  });
});

// 모집글 수정
app.put('/api/v1/recruits/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    address,
    salary,
    positions,
    startDate,
    endDate,
    images,
  } = req.body;
  const recruitIndex = recruits.findIndex((recruit) => recruit.id === id);
  if (recruitIndex < 0) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  const recruit = recruits[recruitIndex];
  if (recruit.user.id !== req.user.id) {
    return res.json({
      success: false,
      message: '권한이 없습니다.',
    });
  }

  if (title) recruit.title = title;
  if (content) recruit.content = content;
  if (address) recruit.address = address;
  if (salary) recruit.salary = salary;
  if (positions) recruit.positions = positions;
  if (startDate) recruit.startDate = startDate;
  if (endDate) recruit.endDate = endDate;
  if (images) recruit.images = images;
  recruit.updatedAt = new Date().toISOString();
  recruits[recruitIndex] = recruit;

  res.json({
    success: true,
    message: '모집글이 수정되었습니다.',
    data: {
      recruit,
    },
  });
});

// 채용 삭제
app.delete('/api/v1/recruits/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const recruitIndex = recruits.findIndex((recruit) => recruit.id === id);
  if (recruitIndex < 0) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  const recruit = recruits[recruitIndex];
  if (recruit.user.id !== req.user.id) {
    return res.json({
      success: false,
      message: '권한이 없습니다.',
    });
  }

  recruits.splice(recruitIndex, 1);

  res.json({
    success: true,
    message: '모집글이 삭제되었습니다.',
  });
});

// 내 정보
app.get('/api/v1/users/me', authMiddleware, (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({
      success: false,
      message: '존재하지 않는 아이디입니다.',
    });
  }

  res.json({
    success: true,
    data: {
      user,
    },
  });
});

// 내 정보 수정
app.put('/api/v1/users/me', authMiddleware, (req, res) => {
  const { name, positions, password, newPassword, role } = req.body;

  const loginUser = req.user;
  if (!loginUser) {
    return res.json({
      success: false,
      message: '존재하지 않는 아이디입니다.',
    });
  }

  if (!password || password !== loginUser.password) {
    return res.json({
      success: false,
      message: '기존 비밀번호가 일치하지 않습니다.',
    });
  }

  const userIndex = users.findIndex((user) => user.email === loginUser.email);
  const user = users[userIndex];
  if (name) user.name = name;
  if (positions) user.positions = positions;
  if (newPassword) user.password = newPassword;
  if (role) user.role = role;
  users[userIndex] = user;

  res.json({
    success: true,
    message: '내 정보가 수정되었습니다.',
    data: {
      user,
    },
  });
});

// Mock API 서버 실행
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
