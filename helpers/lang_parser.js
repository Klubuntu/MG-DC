const YAML = require('yaml')
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

async function getLanguage(usrLang) {
   let langPath = `lang/${usrLang}.yml`;
   if (!fs.existsSync(langPath)) {
      console.log('[DEBUG] Language does not exist - using default!');
      langPath = 'lang/en.yml';
   }
   try {
      const data = await readFileAsync(langPath, 'utf8');
      const parsed = YAML.parse(data);
      const config = parsed[0]
      config.messages = parsed[1].messages
      return config;
   } catch (error) {
      console.error('[ERROR] Unable to read or parse language file:', error.message);
      throw error;
   }
}

function getLanguage_without_async(usrLang) {
   let langPath = `lang/${usrLang}.yml`;
   if (!fs.existsSync(langPath)) {
     console.log('[DEBUG] Language does not exist - using default!');
     langPath = 'lang/en.yml';
   }
 
   try {
     const data = fs.readFileSync(langPath, 'utf8');
     const parsed = YAML.parse(data);
     const config = parsed[0];
     config.messages = parsed[1].messages;
     return config;
   } catch (error) {
     console.error('[ERROR] Unable to read or parse language file:', error.message);
     throw error;
   }
 }

async function processLanguage(lang) {
   console.log("[DEBUG] Getting language: ", lang);
   const languageData = await getLanguage(lang);
   return languageData;
}

function processLanguage_embeds(lang) {
   return getLanguage_without_async(lang);
}

module.exports = processLanguage;
module.exports.embeds = processLanguage_embeds;

