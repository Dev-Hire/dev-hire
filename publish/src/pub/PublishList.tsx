import StarIcon from '@mui/icons-material/Star';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { PublishPageInfo, PageKey } from '../types/global';

const PAGE_LIST: PublishPageInfo[] = [
  {
    key: 'pub-common',
    label: '모달',
    pages: [
      {
        key: 'alert',
        label: '알림창',
        isDone: true,
      },

      {
        key: 'confirm',
        label: '확인창',
        isDone: true,
      },

      {
        key: 'toast',
        label: '토스트',
        isDone: true,
      },

      {
        key: 'loading',
        label: '로딩창',
        isDone: true,
      },
    ],
  },

  {
    key: 'pub-login',
    label: '로그인',
    pages: [
      {
        key: 'login',
        label: '로그인',
        isDone: true,
      },

      {
        key: 'register',
        label: '회원가입',
        isDone: true,
      },
    ],
  },

  {
    key: 'pub-main',
    label: '메인',
    pages: [
      {
        key: 'home',
        label: '홈',
        isDone: true,
      },
    ],
  },

  {
    key: 'pub-recruit',
    label: '채용 공고',
    pages: [
      {
        key: 'recruit-detail',
        label: '공고 상세',
        isDone: true,
      },

      {
        key: 'recruit-add',
        label: '공고 등록',
        isDone: false,
      },

      {
        key: 'recruit-edit',
        label: '공고 수정',
        isDone: false,
      },
    ],
  },

  {
    key: 'pub-mypage',
    label: '마이페이지',
    pages: [
      {
        key: 'my-page',
        label: '내 정보',
        isDone: true,
      },
    ],
  },
];

function PublishList() {
  const openPage = (key: PageKey) => {
    window.open(`/${key}`);
  };

  return (
    <div className="container">
      <h2>퍼블리싱 페이지 리스트</h2>

      <div
        className="content"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px',
        }}
      >
        {Object.values(PAGE_LIST).map(({ key, label, pages }) => (
          <List
            key={key}
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>{label}</ListSubheader>}
          >
            {pages.map(({ key, label, isDone }) => (
              <ListItem key={key} disablePadding onClick={() => openPage(key)}>
                <ListItemButton>
                  <ListItemIcon>
                    <StarIcon color={isDone ? 'primary' : undefined} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ))}
      </div>
    </div>
  );
}

export default PublishList;
