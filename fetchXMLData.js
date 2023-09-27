const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

// Define the URL of your supplier's XML data endpoint
const supplierXMLUrl = 'http://anda-l.lv/xml/ON-LINE_lv.xml';

async function fetchAndProcessSupplierData() {
    try {
        // Fetch XML data from the supplier
        const response = await axios.get(supplierXMLUrl);
    
        if (response.status === 200) {
          // Parse the XML data using xml2js
          const xmlParser = new xml2js.Parser();
          const parsedData = await xmlParser.parseStringPromise(response.data);
          
          // Store the parsed data in a JSON file
          const jsonData = JSON.stringify(parsedData);
          fs.writeFileSync('supplierData.json', jsonData);
    
          console.log('XML data fetched, parsed, and stored successfully.');
        } else {
          console.error('Failed to fetch XML data. Status code:', response.status);
        }
    } catch (error) {
        console.error('Error fetching, parsing, and storing XML data:', error.message);
    }
}

module.exports = fetchAndProcessSupplierData;
