import axios from 'axios';

export const getRecruits = () => {
  const url = '/api/v1/recruits';
  return axios.get(url).then((res) => res.data);
};

export const getRecruit = (id: string) => {
  const url = `/api/v1/recruits/${id}`;
  return axios.get(url).then((res) => res.data);
};
