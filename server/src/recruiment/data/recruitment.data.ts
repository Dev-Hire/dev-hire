// Recruits 샘플 데이터
export const recruits = [
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