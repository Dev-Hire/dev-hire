import { User } from '@/types/users';

/**
 * 유저 객체를 받아서 유저 이름을 반환하는 함수
 * @param {User | string} user 유저 객체
 * @return {string} 유저 이름
 * @example
 * getUserName({ name: '김철수', age: 20 }) => 김철수
 */
export const getUserName = (user: User | string) => {
  if (typeof user === 'object') return user.name;
  return '유저';
};

/**
 * 숫자로 된 가격을 3자리마다 콤마를 찍어서 반환하는 함수
 * @param {number} price 숫자로 된 가격
 * @return {string} 3자리마다 콤마가 찍힌 가격
 * @example
 * formatCurrency(1000000) => 1,000,000
 */
export const formatCurrency = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
