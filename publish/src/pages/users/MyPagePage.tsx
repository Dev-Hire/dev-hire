import { getRecruits } from '@/api';
import Layout from '@/components/layouts/Layout';
import RecruitCard from '@/components/recruits/RecruitCard';
import { Recruit } from '@/types/recruit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

const MyPagePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [recruits, setRecruits] = useState([]);

  const handleChange = (event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const fetchRecruits = async () => {
    const { data } = await getRecruits();
    const recruits = data.recruits;
    setRecruits(recruits);
  };

  useEffect(() => {
    fetchRecruits();
  }, []);

  return (
    <Layout>
      <div className="my-page">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="내 정보" />
            <Tab label="지원한 공고" />
          </Tabs>
        </Box>

        {tabIndex === 0 ? (
          <div className="my-page-tab">
            <div className="my-page-profile">
              <div className="my-page-profile-header">
                <h3>프로필</h3>
              </div>

              <TextField
                fullWidth
                margin="dense"
                id="email"
                label="이메일 주소"
                type="email"
                variant="standard"
              />
              <TextField
                fullWidth
                margin="dense"
                id="password"
                label="비밀번호"
                type="password"
                variant="standard"
              />
              <TextField
                fullWidth
                margin="dense"
                id="passwordConfirm"
                label="새로운 비밀번호"
                type="password"
                variant="standard"
              />
              <TextField
                fullWidth
                margin="dense"
                id="passwordConfirm"
                label="새로운 비밀번호 확인"
                type="password"
                variant="standard"
              />
              <TextField
                fullWidth
                margin="dense"
                id="name"
                label="이름"
                type="text"
                variant="standard"
              />
            </div>

            <div className="my-page-position">
              <div className="my-page-position-header">
                <h3>포지션</h3>

                <div className="my-page-position-functions">
                  <Button size="small" variant="contained">
                    추가
                  </Button>
                </div>
              </div>

              <div className="my-page-position-item">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel>파트</InputLabel>

                  <Select>
                    <MenuItem value="frontend">프론트엔드</MenuItem>
                    <MenuItem value="backend">백엔드</MenuItem>
                    <MenuItem value="planner">기획자</MenuItem>
                    <MenuItem value="degisner">디자이너</MenuItem>
                    <MenuItem value="publisher">퍼블리셔</MenuItem>
                    <MenuItem value="manager">관리자</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel>경력</InputLabel>

                  <Select>
                    <MenuItem value={0}>신입</MenuItem>
                    <MenuItem value={1}>1년</MenuItem>
                    <MenuItem value={2}>2년</MenuItem>
                    <MenuItem value={3}>3년</MenuItem>
                    <MenuItem value={4}>4년</MenuItem>
                    <MenuItem value={5}>5년</MenuItem>
                  </Select>
                </FormControl>

                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ) : tabIndex === 1 ? (
          <div className="my-page-tab" hidden={tabIndex !== 1}>
            <div className="recruit-list">
              {recruits.map((recruit: Recruit) => (
                <RecruitCard key={recruit.id} recruit={recruit} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyPagePage;
