import { getRecruits } from '@/api/recruits.api';
import Layout from '@/components/layouts/Layout';
import RecruitCard from '@/components/recruits/RecruitCard';
import queryKey from '@/constants/queryKey';
import { Recruit } from '@/types/recruit';
import { useQuery } from 'react-query';

const HomePage = () => {
  const { isLoading, data } = useQuery(queryKey.GET_RECRUITS, getRecruits);

  return (
    <Layout>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="recruit-list">
          {data.data.recruits.map((recruit: Recruit) => (
            <RecruitCard key={recruit.id} recruit={recruit} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
