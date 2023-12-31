const path = require('path');
const express = require('express');
const app = express();

const PORT = 4000;
const JWT_SECRET = 'sdfalkjwlkj';
const users = [
  {
    id: 'u1',
    email: 'admin@admin.com',
    password: '1234',
    name: '관리자',
    positions: [],
    recruits: [],
    role: 'admin',
  },
  {
    id: 'u2',
    email: 'test@test.com',
    password: '1234',
    name: '테스트',
    positions: [
      {
        part: 'frontend',
        experience: 0,
      },
    ],
    recruits: ['r1'],
    role: 'developer',
  },
  {
    id: 'u3',
    email: 'test2@test2.com',
    password: '1234',
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
    recruits: ['r1', 'r2'],
    role: 'developer',
  },
  {
    id: 'u4',
    email: 'employer@employer.com',
    password: '1234',
    name: '고용주',
    positions: [],
    recruits: [],
    role: 'employer',
  },
  {
    id: 'u5',
    email: 'employer2@employer2.com',
    password: '1234',
    name: '고용주2',
    positions: [],
    recruits: [],
    role: 'employer',
  },
];
const recruits = [
  {
    id: 'r1',
    title: '신입 웹 개발자 모집',
    description:
      '저희 DevWorld에서 신입 웹 개발자를 모집합니다. 많은 지원 바랍니다. 감사합니다.',
    company: 'DevWorld',
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
    applicants: ['u2', 'u3'],
    user: 'u4',
    isEnded: false,
    createdAt: '2023-07-29',
    updatedAt: '2023-07-29',
  },

  {
    id: 'r2',
    title: '경력 웹 개발자 모집',
    description:
      '저희 DevPro에서 경력 웹 개발자를 모집합니다. 많은 지원 바랍니다. 감사합니다.',
    company: 'DevPro',
    address: '경기도 분당시 정자동',
    positions: [
      {
        part: 'frontend',
        experience: 2,
      },
      {
        part: 'backend',
        experience: 3,
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
    applicants: ['u3'],
    user: 'u5',
    isEnded: false,
    createdAt: '2023-07-29',
    updatedAt: '2023-07-29',
  },
];

// 미들웨어
app.use(express.json());
app.use(basicLogger);
app.use(express.static('dist'));

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

  const user = { ...users[userIndex] };
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
    password,
    name,
    positions: [],
    recruits: [],
    role,
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

// 모집글 상세 조회
app.get('/api/v1/recruits/:id', (req, res) => {
  const { id } = req.params;
  const existingRecruit = recruits.find((recruit) => recruit.id === id);
  if (!existingRecruit) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }
  const recruit = { ...existingRecruit };

  // 작성자/지원자 정보 Populate
  populate(recruit, {
    user: 'user',
    applicants: 'user',
  });

  res.json({
    success: true,
    data: {
      recruit,
    },
  });
});

// 모집글 등록
app.post('/api/v1/recruits', authMiddleware, (req, res) => {
  const {
    title,
    description,
    company,
    address,
    salary,
    positions,
    startDate,
    endDate,
    images,
  } = req.body;

  // 필수 값 확인
  if (
    !title ||
    !description ||
    !company ||
    !address ||
    !salary ||
    !positions ||
    !startDate ||
    !endDate
  ) {
    return res.json({
      success: false,
      message: '필수 값이 누락되었습니다.',
    });
  }

  const recruit = {
    id: `r${recruits.length + 1}`,
    title,
    description,
    company,
    address,
    salary,
    positions,
    startDate,
    endDate,
    images,
    user: req.user,
    positions: [],
    applicants: [],
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

// 모집글 수정
app.put('/api/v1/recruits/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    company,
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

  const recruit = { ...recruits[recruitIndex] };
  if (recruit.user.id !== req.user.id) {
    return res.json({
      success: false,
      message: '권한이 없습니다.',
    });
  }

  if (title) recruit.title = title;
  if (description) recruit.description = description;
  if (company) recruit.company = company;
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

  const recruit = { ...recruits[recruitIndex] };
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
  const user = { ...req.user };
  if (!user) {
    return res.json({
      success: false,
      message: '존재하지 않는 아이디입니다.',
    });
  }

  // 지원한 채용공고 Populate
  populate(user, {
    recruits: 'recruit',
  });

  res.json({
    success: true,
    data: {
      user,
    },
  });
});

// 채용 지원
app.post('/api/v1/recruits/:id/apply', authMiddleware, (req, res) => {
  const { id } = req.params;
  const recruitIndex = recruits.findIndex((recruit) => recruit.id === id);
  if (recruitIndex < 0) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  const recruit = { ...recruits[recruitIndex] };
  const user = { ...req.user };
  if (recruit.applicants.includes(user.id)) {
    return res.json({
      success: false,
      message: '이미 지원한 채용공고입니다.',
    });
  }

  recruit.applicants.push(user.id);
  recruit.updatedAt = new Date().toISOString();
  recruits[recruitIndex] = recruit;

  user.recruits.push(recruit.id);
  const userIndex = users.findIndex((user) => user.id === user.id);
  users[userIndex] = user;

  res.json({
    success: true,
    message: '채용공고에 지원했습니다.',
    data: {
      recruit,
    },
  });
});

// 채용 지원 취소
app.delete('/api/v1/recruits/:id/apply', authMiddleware, (req, res) => {
  const { id } = req.params;
  const recruitIndex = recruits.findIndex((recruit) => recruit.id === id);

  if (recruitIndex < 0) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  const recruit = { ...recruits[recruitIndex] };
  const user = { ...req.user };
  if (!recruit.applicants.includes(user.id)) {
    return res.json({
      success: false,
      message: '지원하지 않은 채용공고입니다.',
    });
  }

  recruit.applicants = recruit.applicants.filter((id) => id !== user.id);
  recruit.updatedAt = new Date().toISOString();
  recruits[recruitIndex] = recruit;

  user.recruits = user.recruits.filter((id) => id !== recruit.id);
  const userIndex = users.findIndex((user) => user.id === user.id);
  users[userIndex] = user;

  res.json({
    success: true,
    message: '채용공고 지원을 취소했습니다.',
    data: {
      recruit,
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
  const user = { ...users[userIndex] };
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

// 채용 종료
app.put('/api/v1/recruits/:id/end', authMiddleware, (req, res) => {
  const { id } = req.params;
  const recruitIndex = recruits.findIndex((recruit) => recruit.id === id);
  if (recruitIndex < 0) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  const recruit = { ...recruits[recruitIndex] };
  const user = { ...req.user };
  if (recruit.user !== user.id) {
    return res.json({
      success: false,
      message: '권한이 없습니다.',
    });
  }

  recruit.isEnded = true;
  recruit.updatedAt = new Date().toISOString();
  recruits[recruitIndex] = recruit;

  res.json({
    success: true,
    message: '채용공고가 종료되었습니다.',
    data: {
      recruit,
    },
  });
});

// 채용 재시작
app.put('/api/v1/recruits/:id/restart', authMiddleware, (req, res) => {
  const { id } = req.params;
  const recruitIndex = recruits.findIndex((recruit) => recruit.id === id);
  if (recruitIndex < 0) {
    return res.json({
      success: false,
      message: '존재하지 않는 모집글입니다.',
    });
  }

  const recruit = { ...recruits[recruitIndex] };
  const user = { ...req.user };
  if (recruit.user !== user.id) {
    return res.json({
      success: false,
      message: '권한이 없습니다.',
    });
  }

  recruit.isEnded = false;
  recruit.updatedAt = new Date().toISOString();
  recruits[recruitIndex] = recruit;

  res.json({
    success: true,
    message: '채용공고가 재시작되었습니다.',
    data: {
      recruit,
    },
  });
});

/* 그 외의 경로는 전부 Public 폴더의 경로로 Redirect */
const publishPath = path.resolve(__dirname, 'dist/index.html');
app.get('*', (req, res) => res.sendFile(publishPath));

// Mock API 서버 실행
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// Logger
function basicLogger(req, _, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

// Populate 함수
function populate(model, populates) {
  for (const key in populates) {
    const populate = populates[key];
    const populateModel =
      populate === 'user' ? users : populate === 'recruit' ? recruits : null;
    if (!populateModel) continue;

    const target = model[key];
    if (typeof target === 'string') {
      const targetId = target;
      const populated = populateModel.find((user) => user.id === targetId);
      model[key] = populated;
    } else if (Array.isArray(target)) {
      const targets = target.map((targetId, index) => {
        const populated = populateModel.find((user) => user.id === targetId);
        return populated;
      });
      model[key] = targets;
    }
  }
}
