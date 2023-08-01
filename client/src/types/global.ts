export type PageKey =
  | 'alert'
  | 'confirm'
  | 'toast'
  | 'loading'
  | 'login'
  | 'register'
  | 'home'
  | 'recruit-add'
  | 'recruit-detail'
  | 'recruit-edit'
  | 'my-page';

export interface PageInfo {
  key: PageKey;
  label: string;
  isDone?: boolean;
}

export interface PublishPageInfo {
  key: string;
  label: string;
  pages: PageInfo[];
}
