import Layout from '@/components/layouts/Layout';
import {
  Button,
  Chip,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RecruitEditPage = () => {
  return (
    <Layout>
      <div className="recruit">
        <div className="recruit-header">
          <div className="recruit-title">
            <TextField autoFocus fullWidth label="채용공고 제목" type="text" />
          </div>

          <div className="recruit-status">
            <Chip label="저장하기" color="primary" onClick={() => {}} />
            <Chip label="삭제하기" color="error" onClick={() => {}} />
            <Chip label="돌아가기" color="warning" onClick={() => {}} />
          </div>
        </div>

        <div className="recruit-company">
          <div className="recruit-company-title">회사 정보</div>

          <ImageList sx={{ height: 250 }} cols={4}>
            <ImageListItem>
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                srcSet="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                loading="lazy"
              />
            </ImageListItem>

            <ImageListItem>
              <div className="recruit-image-add"></div>
            </ImageListItem>
          </ImageList>

          <div className="recruit-company-detail">
            <TextField label="회사 이름" type="text" />
            <TextField label="회사 주소" type="text" />
          </div>
        </div>

        <div className="recruit-position">
          <div className="recruit-position-header">
            <div className="recruit-position-title">채용분야</div>

            <div className="recruit-position-functions">
              <Button size="small" variant="contained">
                추가
              </Button>
            </div>
          </div>

          <div className="recruit-position-list">
            <div className="recruit-position-item">
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

        <div className="recruit-description">
          <div className="recruit-description-title">모집 내용</div>

          <div className="recruit-description-content">
            <TextField fullWidth multiline rows={7} />
          </div>
        </div>

        <div className="recruit-etc">
          <div className="recruit-etc-title">기타 사항</div>

          <div className="recruit-etc-content">
            <TextField fullWidth margin="dense" label="연봉" type="number" />

            <div className="recruit-etc-item">
              채용 기간: <TextField margin="dense" type="date" />
              <strong> ~ </strong>
              <TextField margin="dense" type="date" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitEditPage;
