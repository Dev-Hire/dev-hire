const express = require('express');
const { authMiddleware, populate } = require('./utils');
const { users, recruits } = require('./data');
const { JWT_SECRET } = require('./config');

// Express Router
const router = express.Router();

// 임시 API
// 로그인
router.post('/api/v1/auth/login', (req, res) => {
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
router.post('/api/v1/auth/register', (req, res) => {
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
router.get('/api/v1/recruits', (req, res) => {
  res.json({
    success: true,
    data: {
      recruits,
    },
  });
});

// 모집글 상세 조회
router.get('/api/v1/recruits/:id', (req, res) => {
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
router.post('/api/v1/recruits', authMiddleware, (req, res) => {
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
router.put('/api/v1/recruits/:id', authMiddleware, (req, res) => {
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
router.delete('/api/v1/recruits/:id', authMiddleware, (req, res) => {
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
router.get('/api/v1/users/me', authMiddleware, (req, res) => {
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
router.post('/api/v1/recruits/:id/apply', authMiddleware, (req, res) => {
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
router.delete('/api/v1/recruits/:id/apply', authMiddleware, (req, res) => {
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
router.put('/api/v1/users/me', authMiddleware, (req, res) => {
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
router.put('/api/v1/recruits/:id/end', authMiddleware, (req, res) => {
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
router.put('/api/v1/recruits/:id/restart', authMiddleware, (req, res) => {
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

module.exports = router;
