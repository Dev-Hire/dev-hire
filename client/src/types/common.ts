export interface Modal {
  id: string;
  type: string;
}

export interface Alert extends Modal {
  type: 'alert';
  title?: string;
  message: string;
  isOpen: boolean;
  onClose?: () => void;
}

export interface AlertOptions {
  title?: string;
  onClose?: () => void;
}

export interface Confirm extends Modal {
  type: 'confirm';
  title?: string;
  message: string;
  isOpen: boolean;
  onClose?: (isConfirm: boolean) => void;
}

export interface ConfirmOptions {
  title?: string;
  onClose?: (isConfirm: boolean) => void;
}

export interface Toast extends Modal {
  type: 'toast';
  title?: string;
  message: string;
  duration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
  isOpen: boolean;
  onClose?: () => void;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
  onClose?: () => void;
}

export interface Loading extends Modal {
  type: 'loading';
  message?: string;
  isOpen: boolean;
}

export interface LoadingOptions {
  message?: string;
}
