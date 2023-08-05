
import { getRecruit } from '@/api';
import Layout from '@/components/layouts/Layout';
import { Chip, ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { Recruit } from '@/types/recruit';

interface RecruitDetailPageProps {
  recruitId: string;
}

const RecruitDetailPage = ({ recruitId }: RecruitDetailPageProps) => {

  const [recruit, setRecruit] = useState<Recruit | null>(null);

  useEffect(() => {
    // TODO: Change
    const recruitId = "r1"
    getRecruit(recruitId).then((res) => {
      const recruit = res.data.recruit;
      console.log("recruit", recruit);
      setRecruit(recruit);
    });
  }, []);

  // 채용공고 로딩 중
  if (!recruit) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="recruit">
        <div className="recruit-header">
          <div className="recruit-title">{recruit.title}</div>

          <div className="recruit-status">
            <Chip label="지원하기" color="primary" onClick={() => { }} />
            <Chip label="내가 지원한 공고" color="error" />
          </div>
        </div>
        <div className="recruit-company">
          <div className="recruit-company-title">회사 정보</div>

          <ImageList sx={{ height: 250 }} cols={4}>
            {recruit.images.map((image, index) => (
              <ImageListItem key={index}>
                <img src={image} srcSet={image} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>

          <div className="recruit-company-detail">
            <div className="recruit-company-item">
              회사 이름: <strong>{recruit.company}</strong>
            </div>
            <div className="recruit-company-item">
              회사 주소: <strong>{recruit.address}</strong>
            </div>
          </div>
        </div>

        <div className="recruit-position">
          <div className="recruit-position-title">채용분야</div>

          <div className="recruit-position-list">
            {recruit.positions.map((position, index) => (
              <div className="recruit-position-item" key={index}>
                <div className="recruit-position-item-title">
                  {position.part === 'frontend' ? '프론트엔드' : '백엔드'}
                </div>
                <div className="recruit-position-item-content">
                  {position.experience}년차 이상
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recruit-description">
          <div className="recruit-description-title">모집 내용</div>
          <div
            className="recruit-description-content"
            dangerouslySetInnerHTML={{ __html: recruit.description.replace(/\n/g, '<br />') }}
          />
        </div>

        <div className="recruit-etc">
          <div className="recruit-etc-title">기타 사항</div>
          <div className="recruit-etc-content">
            <div className="recruit-etc-item">
              연봉: <strong>{recruit.salary}원</strong>
            </div>
            <div className="recruit-etc-item">
              채용 기간: <strong>{recruit.startDate} ~ {recruit.endDate}</strong>
            </div>
            <div className="recruit-etc-item">
              지원자: <strong>{recruit.applicants.length}명</strong>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitDetailPage;
