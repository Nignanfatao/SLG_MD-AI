const { File } = require('megajs');
const fs = require('fs');
const path = require('path');
const urlModule = require('url');

async function saveCreds(txt) {
  const __filename = urlModule.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const output = path.join(__dirname, './session/');

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  const megaCode = txt.replace('SLG_MD_WABOT&', '').trim();
  const url = `https://mega.nz/file/${megaCode}`;
  const file = File.fromURL(url);
  await file.loadAttributes();

  const credsPath = path.join(output, "creds.json");
  const data = await file.downloadBuffer();
  fs.writeFileSync(credsPath, data);
  console.log('Credentials saved to :', credsPath);
}

module.exports = {
  saveCreds
};
