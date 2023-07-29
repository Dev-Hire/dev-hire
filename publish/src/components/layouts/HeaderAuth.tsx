import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const HeaderAuth = ({ isLogin }: { isLogin: boolean }) => {
  return !isLogin ? (
    <>
      <Box className="menu-box">
        <Button color="inherit">로그아웃</Button>
      </Box>

      <Avatar
        className="header-avatar"
        alt="User Avatar"
        src="/user-avatar.png"
      />
    </>
  ) : (
    <Box className="menu-box">
      <Button color="inherit">회원가입</Button>
      <Button color="inherit">로그인</Button>
    </Box>
  );
};

export default HeaderAuth;
