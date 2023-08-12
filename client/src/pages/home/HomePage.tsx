import { getRecruits } from '@/api/recruits.api';
import Layout from '@/components/layouts/Layout';
import RecruitCard from '@/components/recruits/RecruitCard';
import queryKey from '@/constants/queryKey';
import { Recruit } from '@/types/recruit';
import { Box, Button, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const { isLoading, data } = useQuery(queryKey.GET_RECRUITS, getRecruits);
  const [serchParams, setSearchParams] = useSearchParams();
  const searchKeyword = serchParams.get('search');

  const filterBySearch = (data: Recruit[]) => {
    if (!searchKeyword) return data;
    return data.filter(({ title }) => title.includes(searchKeyword));
  };

  const onClickFilterReset = () => setSearchParams('');

  return (
    <Layout>
      {isLoading ? (
        <div>loading...</div>
      ) : filterBySearch(data.data.recruits).length ? (
        <div className="recruit-list">
          {filterBySearch(data.data.recruits).map((recruit: Recruit) => (
            <RecruitCard key={recruit.id} recruit={recruit} />
          ))}
        </div>
      ) : (
        <Box sx={{ width: '100%', mt: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 18 }}>현재 등록된 공고가 없습니다.</Typography>
          <Button onClick={onClickFilterReset}>{searchKeyword && '검색조건 삭제'}</Button>
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;
