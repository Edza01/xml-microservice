const axios = require('axios');
const fs = require('fs');
const diff = require('diff'); // Import the 'diff' package
const { logFetchedXMLDataWithWhiteSpace } = require('./helpers.js');

async function fetchAndProcessSupplierData(supplierXMLUrl, oldXmlFilePath, newXmlFilePath) {
  try {
      if (!fs.existsSync(oldXmlFilePath)) 
      {
        // File doesn't exist in xml_old directory
        const response = await axios.get(supplierXMLUrl);

        if (response.status === 200) {
          fs.writeFileSync(oldXmlFilePath, response.data);
          logFetchedXMLDataWithWhiteSpace(oldXmlFilePath, supplierXMLUrl);
        } else {
          console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
        }
      } 
      else if (fs.existsSync(oldXmlFilePath))
      {
        // File already exists in xml_old
        const response = await axios.get(supplierXMLUrl);

        if (response.status === 200) {
          fs.writeFileSync(newXmlFilePath, response.data);
          logFetchedXMLDataWithWhiteSpace(newXmlFilePath, supplierXMLUrl);
        } else {
          console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
        }
      }
    } catch (error) {
    console.error('Error fetching, parsing, and storing XML data:', error.message);
  }
}

module.exports = fetchAndProcessSupplierData;
