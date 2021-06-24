import { sign, verify, decode } from 'jsonwebtoken';

const { SECRET, TOKEN_EXPIRY } = process.env;

const getToken = (payload) =>
  sign(payload, SECRET, { expiresIn: TOKEN_EXPIRY });

const verifyToken = (token) => {
  return verify(token, SECRET, (err, decoded) => {
    if (err) {
      return { error: 'Error decoding' };
    } else {
      return decoded
    }
  });
};

const decodeToken = (token) => decode(token);

export { getToken, verifyToken, decodeToken };
