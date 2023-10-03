 // compare both old and new xmls

// // Read the existing XML file from xml_old
// const oldXmlData = fs.readFileSync(path.join(oldXmlDestinationDir, xmlFileName), 'utf8');

// // Fetch XML data from the supplier
// const response = await axios.get(supplierXMLUrl);

// if (response.status === 200) {
//   // Compare the new XML data with the existing XML data
//   const newXmlData = response.data;
//   const differences = diff.diffChars(oldXmlData, newXmlData);

//   // Determine if there are differences
//   if (differences.some(part => part.added || part.removed)) {
//   console.log(`XML data has changed for URL: ${supplierXMLUrl}`);
//   }
// }

function compareXML(xmlFileName) {
    
}

module.exports = { compareXML };
