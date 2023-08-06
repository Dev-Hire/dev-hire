import { getRecruit } from '@/api/recruits.api';
import Layout from '@/components/layouts/Layout';
import queryKey from '@/constants/queryKey';
import { POSITION_TEXT_INFO } from '@/constants/recruit';
import useModal from '@/hooks/useModal';
import { Recruit } from '@/types/recruit';
import { formatCurrency } from '@/utils/utils';
import { Chip, ImageList, ImageListItem } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

const RecruitDetailPage = () => {
  const navigate = useNavigate();
  const { id: recruitId } = useParams<{ id: string }>();
  const { showConfirm, showToast } = useModal();

  const { data } = useQuery(queryKey.GET_RECRUIT, () => getRecruit(recruitId!));
  const recruit: Recruit = data?.data.recruit;

  const applyRecruit = () => {
    showToast('로그인 유저 정보를 찾을 수 없습니다.');
  };

  const handleApply = () => {
    showConfirm('지원하시겠습니까?', {
      title: '지원하기',
      onClose: (isConfirm) => {
        if (isConfirm) applyRecruit();
      },
    });
  };

  return (
    recruit && (
      <Layout>
        <div className="recruit">
          <div className="recruit-header">
            <div className="recruit-title">{recruit.title}</div>

            <div className="recruit-status">
              <Chip label="지원하기" color="primary" onClick={handleApply} />
              <Chip label="내가 지원한 공고" color="error" />
            </div>
          </div>

          <div className="recruit-company">
            <div className="recruit-company-title">회사 정보</div>

            <ImageList sx={{ height: 250 }} cols={4}>
              {recruit.images?.length > 0 &&
                recruit.images.map((image: string, index) => (
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
              {recruit.positions?.map((position, index) => (
                <div className="recruit-position-item" key={index}>
                  <div className="recruit-position-item-title">{POSITION_TEXT_INFO[position.part]}</div>
                  <div className="recruit-position-item-content">{position.experience}년 이상</div>
                </div>
              ))}
            </div>
          </div>

          <div className="recruit-description">
            <div className="recruit-description-title">모집 내용</div>

            <div className="recruit-description-content">{recruit.description}</div>
          </div>

          <div className="recruit-etc">
            <div className="recruit-etc-title">기타 사항</div>

            <div className="recruit-etc-content">
              <div className="recruit-etc-item">
                연봉: <strong> {formatCurrency(recruit.salary)}원</strong>
              </div>
              <div className="recruit-etc-item">
                채용 기간:
                <strong>
                  {recruit.startDate} ~ {recruit.endDate}
                </strong>
              </div>
              <div className="recruit-etc-item">
                지원자: <strong>{recruit.applicants?.length || 0}명</strong>
              </div>
            </div>
          </div>

          <div className="recruit-buttons">
            <Chip label="목록으로" color="primary" onClick={() => navigate('/home')} />
          </div>
        </div>
      </Layout>
    )
  );
};

export default RecruitDetailPage;
