import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// node path/to/apiDataUpdate.mjs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    
const API_URL = 'http://universities.hipolabs.com/search'; // fetched around 10k data

const fetchAndSaveUniversityData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const formattedData = data.map((university, index) => ({
      id: index + 1,  
      name: university.name,
      domain: university.domains, 
      country: university.country,
      alpha_two_code: university.alpha_two_code,  
      web_page: university.web_pages 
    }));

    const filePath = path.join(__dirname, '../components/ApiList/ApiData.json');
    fs.writeFileSync(filePath, JSON.stringify(formattedData, null, 2));

    console.log(`Data fetched and saved to ${filePath}`);
  } catch (error) {
    console.error('Error fetching and saving university data:', error);
  }
};

fetchAndSaveUniversityData();
