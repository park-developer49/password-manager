import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secret = 'mySuperSecretKey123!';

// Create a 32-byte key from secret string
const secretKey = crypto.createHash('sha256').update(secret).digest();

export function encrypt(text) 
{
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(hash) 
{
  if (!hash.includes(':')) 
    return '';
  const [ivHex, encryptedHex] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
}
