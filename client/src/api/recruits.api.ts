import { Axios } from './base.api';

export const getRecruits = () => {
  const url = '/v1/recruits';
  return Axios(url).then((res) => res.data);
};

export const getRecruit = (id: string) => {
  const url = `/v1/recruits/${id}`;
  return Axios(url).then((res) => res.data);
};
