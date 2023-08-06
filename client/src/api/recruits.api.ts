import { Axios } from './base.api';

export const getRecruits = async () => {
  const url = '/v1/recruits';
  return Axios(url).then((res) => res.data);
};

export const getRecruit = (id: string) => {
  const url = `/v1/recruits/${id}`;
  return Axios(url).then((res) => res.data);
};

export const createRecruit = (data: any) => {
  const url = '/v1/recruits';
  return Axios.post(url, data).then((res) => res.data);
};

export const updateRecruit = (id: string, data: any) => {
  const url = `/v1/recruits/${id}`;
  return Axios.put(url, data).then((res) => res.data);
};

export const deleteRecruit = (id: string) => {
  const url = `/v1/recruits/${id}`;
  return Axios.delete(url).then((res) => res.data);
};
