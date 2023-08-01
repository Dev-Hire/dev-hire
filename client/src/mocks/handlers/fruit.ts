// eslint-disable-next-line import/no-extraneous-dependencies
import { rest, RestRequest } from "msw";

// [Get] fruits 서버 요청 시 [ '사과', '바나나' ]를 응답한다.

const fruits = ["사과", "바나나"];
export const getFruits = rest.get("/fruits", (req, res, ctx) => res(ctx.json(fruits)));

export const postFruit = rest.post("/fruits", async (req: RestRequest, res, ctx) => {
  const { data } = await req.json();
  fruits.push(data);
  return res(
    ctx.status(200),
    ctx.json({
      fruits,
    })
  );
});
