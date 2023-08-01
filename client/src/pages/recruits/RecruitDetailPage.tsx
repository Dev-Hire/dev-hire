import Layout from '@/components/layouts/Layout';
import { Chip, ImageList, ImageListItem } from '@mui/material';

const RecruitDetailPage = () => {
  return (
    <Layout>
      <div className="recruit">
        <div className="recruit-header">
          <div className="recruit-title">신입 웹 개발자 모집</div>

          <div className="recruit-status">
            <Chip label="지원하기" color="primary" onClick={() => {}} />
            <Chip label="내가 지원한 공고" color="error" />
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
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
                srcSet="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740"
                srcSet="https://images.unsplash.com/photo-1606857521015-7f9fcf423740"
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>

          <div className="recruit-company-detail">
            <div className="recruit-company-item">
              회사 이름: <strong>DevWorld</strong>
            </div>

            <div className="recruit-company-item">
              회사 주소: <strong>서울특별시 강남구 서초동</strong>
            </div>
          </div>
        </div>

        <div className="recruit-position">
          <div className="recruit-position-title">채용분야</div>

          <div className="recruit-position-list">
            <div className="recruit-position-item">
              <div className="recruit-position-item-title">프론트엔드</div>
              <div className="recruit-position-item-content">3년차 이상</div>
            </div>

            <div className="recruit-position-item">
              <div className="recruit-position-item-title">백엔드</div>
              <div className="recruit-position-item-content">5년차 이상</div>
            </div>
          </div>
        </div>

        <div className="recruit-description">
          <div className="recruit-description-title">모집 내용</div>

          <div className="recruit-description-content">
            저희 DevWorld에서 신입 웹 개발자를 모집합니다.
            <br />
            많은 지원 바랍니다.
            <br />
            감사합니다.
          </div>
        </div>

        <div className="recruit-etc">
          <div className="recruit-etc-title">기타 사항</div>

          <div className="recruit-etc-content">
            <div className="recruit-etc-item">
              연봉: <strong> 50,000,000원</strong>
            </div>
            <div className="recruit-etc-item">
              채용 기간: <strong>2023-07-23 ~ 2023-08-31</strong>
            </div>
            <div className="recruit-etc-item">
              지원자: <strong>3명</strong>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitDetailPage;
