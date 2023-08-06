import React, { ReactElement, createContext, useEffect, useState } from 'react';
import Alert from '@/components/common/modal/Alert';
import Confirm from '@/components/common/modal/Confirm';
import Toast from '@/components/common/modal/Toast';
import Loading from '@/components/common/modal/Loading';
import { Alert as AlertType, Confirm as ConfirmType, Loading as LoadingType, Toast as ToastType } from '@/types/common';
import { Axios } from '@/api/base.api';

export interface ModalContextType {
  alerts: AlertType[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>;
  confirms: ConfirmType[];
  setConfirms: React.Dispatch<React.SetStateAction<ConfirmType[]>>;
  toasts: ToastType[];
  setToasts: React.Dispatch<React.SetStateAction<ToastType[]>>;
  loadings: LoadingType[];
  setLoadings: React.Dispatch<React.SetStateAction<LoadingType[]>>;
}

export const ModalContext = createContext<ModalContextType>({
  alerts: [],
  setAlerts: () => {},
  confirms: [],
  setConfirms: () => {},
  toasts: [],
  setToasts: () => {},
  loadings: [],
  setLoadings: () => {},
});

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [confirms, setConfirms] = useState<ConfirmType[]>([]);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [loadings, setLoadings] = useState<LoadingType[]>([]);

  const apiLoadingId = 'apiLoading';
  const showApiLoading = () => {
    const apiLoading: LoadingType = {
      id: apiLoadingId,
      type: 'loading',
      message: '로딩중 입니다.',
      isOpen: true,
    };
    setLoadings((prev) => [...prev, apiLoading]);
  };

  const hideApiLoading = async () => {
    setLoadings((prev) => {
      const apiLoadingIndex = prev.findIndex((loading) => loading.id === apiLoadingId);
      if (apiLoadingIndex === -1) return prev;

      const newLoadings = [...prev];
      newLoadings.splice(apiLoadingIndex, 1);
      return newLoadings;
    });
  };

  // Add a request interceptor
  Axios.interceptors.request.use(
    function (config) {
      showApiLoading();
      return config;
    },
    function (error) {
      hideApiLoading();
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  Axios.interceptors.response.use(
    function (response) {
      hideApiLoading();
      return response;
    },
    function (error) {
      hideApiLoading();
      return Promise.reject(error);
    },
  );

  return (
    <ModalContext.Provider
      value={{
        alerts,
        setAlerts,
        confirms,
        setConfirms,
        toasts,
        setToasts,
        loadings,
        setLoadings,
      }}
    >
      {children}

      {/* 모달 */}
      {alerts[0] && <Alert {...alerts[0]} />}
      {confirms[0] && <Confirm {...confirms[0]} />}
      {toasts[0] && <Toast {...toasts[0]} />}
      {loadings[0] && <Loading {...loadings[0]} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
