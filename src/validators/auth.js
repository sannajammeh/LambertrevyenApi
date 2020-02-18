import { NOT_AUTHORIZED, TOKEN_REVOKED } from '../error.types';

export const auth = fireAuth => async (req, res, next) => {
  const idToken = req.header('Authorization');
  try {
    if (!idToken) throw new Error(NOT_AUTHORIZED);
    const checkRevoked = true;
    const token = await fireAuth.verifyIdToken(idToken, checkRevoked);

    next();
  } catch (error) {
    if (error.code == 'auth/id-token-revoked') return next(new Error(TOKEN_REVOKED));
    next(new Error(NOT_AUTHORIZED));
  }
};
