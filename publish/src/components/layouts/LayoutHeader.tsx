import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderSearchbar from '@/components/layouts/HeaderSearchbar';
import HeaderAuth from '@/components/layouts/HeaderAuth';

export default function LayoutHeader() {
  return (
    <Box className="layout-header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className="menu-button"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className="header-logo">DevHire</div>
          </Typography>

          <HeaderSearchbar />

          <Box className="menu-box">
            <Button color="inherit">공고 등록</Button>
          </Box>

          <HeaderAuth isLogin={false} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
