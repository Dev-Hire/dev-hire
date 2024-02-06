const { users, recruits } = require('./data');

// Logger
function basicLogger(req, _, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

// 토큰 파싱 미들웨어 [임시]
function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ success: false, message: '인증 정보가 없습니다.' });
  }

  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res
      .status(401)
      .json({ success: false, message: '인증 토큰이 없습니다.' });
  }

  // 토큰 파싱
  const [_, userIndex, tokenSecret] = tokenValue.split('.');
  const isValidToken = tokenSecret === JWT_SECRET;
  if (!isValidToken) {
    return res
      .status(401)
      .json({ success: false, message: '토큰이 정상적이지 않습니다.' });
  }

  // 토큰 파싱 완료 되면 유저정보 세팅
  req.user = users[userIndex];

  next();
}

// Populate 함수
function populate(model, populates) {
  for (const key in populates) {
    const populate = populates[key];
    const populateModel =
      populate === 'user' ? users : populate === 'recruit' ? recruits : null;
    if (!populateModel) continue;

    const target = model[key];
    if (typeof target === 'string') {
      const targetId = target;
      const populated = populateModel.find((user) => user.id === targetId);
      model[key] = populated;
    } else if (Array.isArray(target)) {
      const targets = target.map((targetId, index) => {
        const populated = populateModel.find((user) => user.id === targetId);
        return populated;
      });
      model[key] = targets;
    }
  }
}

module.exports = {
  basicLogger,
  authMiddleware,
  populate,
};
