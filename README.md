# covid-data-highlight
Covid data highlight


For this feature Data is stored in files at backend. Data Json data file was to large to upload for git. If data cant be derived from api sources, application fetches from /jsonData/owid-covid-data.json and /jsonData/vaccinationData.json. Folder link containing jsonData is mentioned below:
https://drive.google.com/drive/folders/15qrAexkwn7vVUCav5kFNw6kIkTsiih39?usp=share_link

Node Version: v18.15.0

Data derived from:
COVID-19 Vaccinations: Provides data on COVID-19 vaccine doses administered globally, by country, and by manufacturer.
API endpoint: https://covid.ourworldindata.org/data/vaccinations

COVID-19 Cases: Provides data on COVID-19 confirmed cases, deaths, and hospitalizations by country.
API endpoint: https://covid.ourworldindata.org/data/owid-covid-data

Project Run instructions:
Client: npm start
Backend: node index.js
