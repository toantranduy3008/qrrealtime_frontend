import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export default function authHeader(body) {
  const token = JSON.parse(sessionStorage.getItem('token'));

  if (token && token.accessToken) {
    const privateKey = "truong"
    const header = { Authorization: 'Bearer ' + token.accessToken };
    // if(privateKey) {
    const hashDigest = sha256(JSON.stringify(body));
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
    header.Signature = hmacDigest;
    // }
    return header; // for Spring Boot back-end
    // return { 'x-access-token': token.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
