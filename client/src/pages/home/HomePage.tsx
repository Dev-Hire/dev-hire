import { getRecruits } from '@/api/index';
import Layout from '@/components/layouts/Layout';
import RecruitCard from '@/components/recruits/RecruitCard';
import { Recruit } from '@/types/recruit';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [recruits, setRecruits] = useState([]);

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
      <div className="recruit-list">
        {recruits.map((recruit: Recruit) => (
          <RecruitCard key={recruit.id} recruit={recruit} />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
