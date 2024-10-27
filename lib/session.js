const { File } = require('megajs');
const fs = require('fs');
const path = require('path');
const config = require('../config'); // Importez votre fichier de configuration

const prefix = config.PREFIX; // Utilisez le préfixe défini dans la configuration
const output = path.join(__dirname, './session/'); // Chemin où creds.json sera sauvegardé

async function ensureSessionDirectory() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
}

async function saveCreds() {
  const id = config.SESSION_ID; // Utilisez l'ID de session défini dans la configuration

  // Vérification de l'ID de session
  if (typeof id !== 'string' || id.length < prefix.length || id.substring(0, prefix.length) !== prefix) {
    throw new Error(`ID de session invalide. Vérifiez que l'ID commence par "${prefix}"`);
  }

  const megaId = id.replace(prefix, "");
  const megaUrl = `https://mega.nz/file/${megaId}`;
  const file = File.fromURL(megaUrl);
  await file.loadAttributes();
  const credsPath = path.join(output, "creds.json");
  const data = await file.downloadBuffer();
  fs.writeFileSync(credsPath, data);
  console.log('Credentials saved to :', credsPath);
}

module.exports = { saveCreds, ensureSessionDirectory };











/* const { File } = require('megajs');
const fs = require('fs');
const path = require('path');

const prefix = "SLG&"; // Your prefix same as in config.PREFIX
const output = path.join(__dirname, './session/'); // Path where creds.json will save

async function ensureSessionDirectory() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
}

async function saveCreds(id) {
  if (!id.startsWith(prefix)) {
    throw new Error(`Prefix doesn't match, check if "${prefix}" is correct`);
  }

  const megaUrl = `https://mega.nz/file/${id.replace(prefix, "")}`;
  const file = File.fromURL(megaUrl);
  await file.loadAttributes();

  const credsPath = path.join(output, "creds.json");

  const data = await file.downloadBuffer();
  fs.writeFileSync(credsPath, data);
  console.log('Credentials saved to :', credsPath);
}

module.exports = {
  saveCreds,
  ensureSessionDirectory,
}; */
