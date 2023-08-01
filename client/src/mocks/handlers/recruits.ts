import { rest } from 'msw';
import { mockRecruits } from '../data/index';

// 모집글 목록 조회
export const getRecruits = rest.get('api/v1/recruits', async (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      success: true,
      message: '모집정보를 불러왔습니다.',
      data: { recruits: mockRecruits },
    }),
  );
});
