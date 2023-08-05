import { UserLoginRequest, UserRegisterRequest } from '@/types/auth';
import { Axios } from './base.api';

export const postUserLogin = async (payload: UserLoginRequest) => {
  const { data } = await Axios.post('/v1/auth/login', payload);
  return data;
};

export const postUserRegister = async (payload: UserRegisterRequest) => {
  const { data } = await Axios.post('/v1/auth/register', payload);
  return data;
};

export const getRecruit = (id: string) => {
  const url = `/v1/recruits/${id}`;
  return Axios(url).then((res) => res.data);
};
