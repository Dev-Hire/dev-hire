import { AxiosError, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatCustomError = (response: AxiosResponse<any, any>) => {
  const customError: AxiosError = {
    message: response.data.message,
    name: 'CustomError',
    request: {
      ...response.request,
      status: response.data.status || 500,
      statusText: response.data.statusText || 'CUSTOM_ERROR',
    },
    code: response.data.code || 'CUSTOM_ERR_BAD_RESPONSE',
    isAxiosError: true,
    toJSON: function (): object {
      throw new Error('Function not implemented.');
    },
  };
  return Promise.reject(customError);
};
