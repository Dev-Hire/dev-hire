import { useContext } from 'react';
import { AlertOptions, ConfirmOptions, LoadingOptions, ToastOptions } from '@/types/common';
import { ModalContext, ModalContextType } from '@/components/common/ModalProvider';
3000;
const useModal = () => {
  const { alerts, setAlerts, confirms, setConfirms, toasts, setToasts, loadings, setLoadings } =
    useContext<ModalContextType>(ModalContext);

  const showAlert = (message: string, options: AlertOptions = {}) => {
    const newAlerts = [...alerts];
    const id = `${new Date().getTime()}`;

    newAlerts.push({
      id,
      type: 'alert',
      title: options.title,
      message,
      onClose: () => {
        hideAlert(id);
        if (typeof options.onClose === 'function') options.onClose();
      },
      isOpen: true,
    });

    setAlerts(newAlerts);
  };

  const hideAlert = (id?: string) => {
    if (id) {
      const newAlerts = alerts.filter((alert) => alert.id !== id);
      setAlerts(newAlerts);
    } else {
      const newAlerts = [...alerts];
      newAlerts.unshift();
      setAlerts(newAlerts);
    }
  };

  const showConfirm = (message: string, options: ConfirmOptions = {}) => {
    const newConfirm = [...confirms];
    const id = `${new Date().getTime()}`;

    newConfirm.push({
      id,
      type: 'confirm',
      title: options.title,
      message,
      onClose: (isConfirm) => {
        hideConfirm(id);
        if (typeof options.onClose === 'function') options.onClose(isConfirm);
      },
      isOpen: true,
    });

    setConfirms(newConfirm);
  };

  const hideConfirm = (id?: string) => {
    if (id) {
      const newConfirm = confirms.filter((confirm) => confirm.id !== id);
      setConfirms(newConfirm);
    } else {
      const newConfirm = [...confirms];
      newConfirm.unshift();
      setConfirms(newConfirm);
    }
  };

  const showToast = (message: string, options: ToastOptions = {}) => {
    const newToast = [...toasts];

    newToast.push({
      id: `${new Date().getTime()}`,
      type: 'toast',
      title: options.title,
      message,
      onClose: options.onClose,
      isOpen: true,
    });

    setToasts(newToast);
  };

  const showLoading = (options: LoadingOptions = {}) => {
    const newLoading = [...loadings];
    const id = `${new Date().getTime()}`;

    newLoading.push({
      id,
      type: 'loading',
      message: options.message,
      isOpen: true,
    });

    setLoadings(newLoading);
  };

  const hideLoading = (id?: string) => {
    if (id) {
      const newLoading = loadings.filter((loading) => loading.id !== id);
      setLoadings(newLoading);
    } else {
      const newLoading = [...loadings];
      newLoading.unshift();
      setLoadings(newLoading);
    }
  };

  return {
    showAlert,
    hideAlert,
    showConfirm,
    hideConfirm,
    showToast,
    showLoading,
    hideLoading,
  };
};

export default useModal;
