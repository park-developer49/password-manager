import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { encrypt, decrypt } from './crypto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define data directory and file path here
const dataDir = path.join(__dirname, '../data');
const dataPath = path.join(dataDir, 'credentials.json');

function loadData() 
{
  if (!fs.existsSync(dataPath)) 
    return {};
  const encrypted = fs.readFileSync(dataPath, 'utf8');
  const decrypted = decrypt(encrypted);
  return JSON.parse(decrypted || '{}');
}

function saveData(data) 
{
  // Make sure data directory exists before writing file
  if (!fs.existsSync(dataDir))
    fs.mkdirSync(dataDir, { recursive: true });
  const encrypted = encrypt(JSON.stringify(data));
  fs.writeFileSync(dataPath, encrypted);
}

export function addCredential(site, username, password) 
{
  const data = loadData();
  data[site] = { username, password };
  saveData(data);
  console.log(`Credentials added for ${site}`);
}

export function getCredential(site) 
{
  const data = loadData();
  if (data[site])
    console.log(`🔐 ${site}:`, data[site]);
  else
    console.log(`No credentials found for ${site}`);
}

export function listCredentials() 
{
  const data = loadData();
  const sites = Object.keys(data);
  if (sites.length === 0) 
    console.log('📭 No credentials stored.');
  else 
  {
    console.log('📒 Stored sites:');
    sites.forEach(site => console.log(`- ${site}`));
  }
}
