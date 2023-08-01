export const mockUsers = [
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
