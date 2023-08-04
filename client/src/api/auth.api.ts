import { Axios } from './base.api';

export const postUserLogin = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await Axios.post('/v1/auth/login', {
    email,
    password,
  });
  return data;
};

export const getRecruit = (id: string) => {
  const url = `/v1/recruits/${id}`;
  return Axios(url).then((res) => res.data);
};
