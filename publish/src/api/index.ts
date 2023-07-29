import axios from 'axios';

export const getRecruits = () => {
  const url = '/api/v1/recruits';
  return axios.get(url).then((res) => res.data);
};
