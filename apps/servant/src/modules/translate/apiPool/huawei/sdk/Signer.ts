/* eslint-disable no-var */
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import * as CryptoJS from 'crypto-js';

const Algorithm = 'SDK-HMAC-SHA256';
const HeaderXDate = 'X-Sdk-Date';
const HeaderAuthorization = 'Authorization';
const HeaderContentSha256 = 'x-sdk-content-sha256';

const hexTable = new Array(256);
for (let i = 0; i < 256; ++i)
  hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();

const noEscape = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0, // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0, // 16 - 31
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0, // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0, // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1, // 64 - 79
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1, // 80 - 95
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1, // 96 - 111
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  0, // 112 - 127
];

export function HttpRequest(method, url, headers, body) {
  if (method === undefined) {
    this.method = '';
  } else {
    this.method = method;
  }
  if (url === undefined) {
    this.host = '';
    this.uri = '';
    this.query = {};
  } else {
    this.query = {};
    let host, path;
    var i = url.indexOf('://');
    if (i !== -1) {
      url = url.substr(i + 3);
    }
    var i = url.indexOf('?');
    if (i !== -1) {
      const query_str = url.substr(i + 1);
      url = url.substr(0, i);
      const spl = query_str.split('&');
      // @ts-expect-error 别管ss
      for (var i in spl) {
        const kv = spl[i];
        const index = kv.indexOf('=');
        var key, value;
        if (index >= 0) {
          key = kv.substr(0, index);
          value = kv.substr(index + 1);
        } else {
          key = kv;
          value = '';
        }
        if (key !== '') {
          key = decodeURI(key);
          value = decodeURI(value);
          if (this.query[key] === undefined) {
            this.query[key] = [value];
          } else {
            this.query[key].push(value);
          }
        }
      }
    }
    var i = url.indexOf('/');
    if (i === -1) {
      host = url;
      path = '/';
    } else {
      host = url.substr(0, i);
      path = url.substr(i);
    }
    this.host = host;
    this.uri = decodeURI(path);
  }
  if (headers === undefined) {
    this.headers = {};
  } else {
    this.headers = headers;
  }
  if (body === undefined) {
    this.body = '';
  } else {
    this.body = body;
  }
}

export default class Signer {
  static Key = process.env.HUAWEICLOUD_SDK_AK;
  static Secret = process.env.HUAWEICLOUD_SDK_SK;

  static findHeader(r, header) {
    for (const k in r.headers) {
      if (k.toLowerCase() === header.toLowerCase()) {
        return r.headers[k];
      }
    }
    return null;
  }

  static twoChar(s) {
    if (s >= 10) {
      return '' + s;
    } else {
      return '0' + s;
    }
  }

  static getTime() {
    const date = new Date();
    return (
      '' +
      date.getUTCFullYear() +
      Signer.twoChar(date.getUTCMonth() + 1) +
      Signer.twoChar(date.getUTCDate()) +
      'T' +
      Signer.twoChar(date.getUTCHours()) +
      Signer.twoChar(date.getUTCMinutes()) +
      Signer.twoChar(date.getUTCSeconds()) +
      'Z'
    );
  }

  static urlEncode(str) {
    if (typeof str !== 'string') {
      if (typeof str === 'object') str = String(str);
      else str += '';
    }
    let out = '';
    let lastPos = 0;

    for (let i = 0; i < str.length; ++i) {
      let c = str.charCodeAt(i);

      // ASCII
      if (c < 0x80) {
        if (noEscape[c] === 1) continue;
        if (lastPos < i) out += str.slice(lastPos, i);
        lastPos = i + 1;
        out += hexTable[c];
        continue;
      }

      if (lastPos < i) out += str.slice(lastPos, i);

      // Multi-byte characters ...
      if (c < 0x800) {
        lastPos = i + 1;
        out += hexTable[0xc0 | (c >> 6)] + hexTable[0x80 | (c & 0x3f)];
        continue;
      }
      if (c < 0xd800 || c >= 0xe000) {
        lastPos = i + 1;
        out +=
          hexTable[0xe0 | (c >> 12)] +
          hexTable[0x80 | ((c >> 6) & 0x3f)] +
          hexTable[0x80 | (c & 0x3f)];
        continue;
      }
      // Surrogate pair
      ++i;

      if (i >= str.length) throw new Error('ERR_INVALID_URI');

      const c2 = str.charCodeAt(i) & 0x3ff;

      lastPos = i + 1;
      c = 0x10000 + (((c & 0x3ff) << 10) | c2);
      out +=
        hexTable[0xf0 | (c >> 18)] +
        hexTable[0x80 | ((c >> 12) & 0x3f)] +
        hexTable[0x80 | ((c >> 6) & 0x3f)] +
        hexTable[0x80 | (c & 0x3f)];
    }
    if (lastPos === 0) return str;
    if (lastPos < str.length) return out + str.slice(lastPos);
    return out;
  }

  static CanonicalQueryString(r) {
    const keys = [];
    for (const key in r.query) {
      keys.push(key);
    }
    keys.sort();
    const a = [];
    for (const i in keys) {
      const key = Signer.urlEncode(keys[i]);
      const value = r.query[keys[i]];
      if (Array.isArray(value)) {
        value.sort();
        for (const iv in value) {
          a.push(key + '=' + Signer.urlEncode(value[iv]));
        }
      } else {
        a.push(key + '=' + Signer.urlEncode(value));
      }
    }
    return a.join('&');
  }

  static SignedHeaders(r) {
    const a = [];
    for (const key in r.headers) {
      a.push(key.toLowerCase());
    }
    a.sort();
    return a;
  }

  static RequestPayload(r) {
    return r.body;
  }

  static CanonicalURI(r) {
    const pattens = r.uri.split('/');
    const uri = [];
    for (const k in pattens) {
      const v = pattens[k];
      uri.push(Signer.urlEncode(v));
    }
    let urlpath = uri.join('/');
    if (urlpath[urlpath.length - 1] !== '/') {
      urlpath = urlpath + '/';
    }
    //r.uri = urlpath
    return urlpath;
  }

  static CanonicalHeaders(r, signedHeaders) {
    const headers = {};
    for (const key in r.headers) {
      headers[key.toLowerCase()] = r.headers[key];
    }
    const a = [];
    for (const i in signedHeaders) {
      const value = headers[signedHeaders[i]];
      a.push(signedHeaders[i] + ':' + value.trim());
    }
    return a.join('\n') + '\n';
  }

  static CanonicalRequest(r, signedHeaders) {
    let hexencode = Signer.findHeader(r, HeaderContentSha256);
    if (hexencode === null) {
      const data = Signer.RequestPayload(r);
      hexencode = CryptoJS.SHA256(data);
    }
    return (
      r.method +
      '\n' +
      Signer.CanonicalURI(r) +
      '\n' +
      Signer.CanonicalQueryString(r) +
      '\n' +
      Signer.CanonicalHeaders(r, signedHeaders) +
      '\n' +
      signedHeaders.join(';') +
      '\n' +
      hexencode
    );
  }

  static StringToSign(canonicalRequest, t) {
    const bytes = CryptoJS.SHA256(canonicalRequest);
    return Algorithm + '\n' + t + '\n' + bytes;
  }

  static SignStringToSign(stringToSign, signingKey) {
    return CryptoJS.HmacSHA256(stringToSign, signingKey).toString(
      CryptoJS.enc.Hex,
    );
  }

  static AuthHeaderValue(signature, Key, signedHeaders) {
    return (
      Algorithm +
      ' Access=' +
      Key +
      ', SignedHeaders=' +
      signedHeaders.join(';') +
      ', Signature=' +
      signature
    );
  }

  static Sign(r) {
    let headerTime = Signer.findHeader(r, HeaderXDate);
    if (headerTime === null) {
      headerTime = Signer.getTime();
      r.headers[HeaderXDate] = headerTime;
    }
    if (r.method !== 'PUT' && r.method !== 'PATCH' && r.method !== 'POST') {
      r.body = '';
    }
    let queryString = Signer.CanonicalQueryString(r);
    if (queryString !== '') {
      queryString = '?' + queryString;
    }
    const options = {
      hostname: r.host,
      path: encodeURI(r.uri) + queryString,
      method: r.method,
      headers: r.headers,
    };
    if (Signer.findHeader(r, 'host') === null) {
      r.headers.host = r.host;
    }
    const signedHeaders = Signer.SignedHeaders(r);
    const canonicalRequest = Signer.CanonicalRequest(r, signedHeaders);
    const stringToSign = Signer.StringToSign(canonicalRequest, headerTime);
    const signature = Signer.SignStringToSign(stringToSign, Signer.Secret);
    options.headers[HeaderAuthorization] = Signer.AuthHeaderValue(
      signature,
      Signer.Key,
      signedHeaders,
    );
    return options;
  }
}
