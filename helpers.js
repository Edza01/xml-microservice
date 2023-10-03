function logFetchedXMLData(xmlType, supplierXMLUrl) {
    const currentTime = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(currentTime);

    return `${formattedTime} - XML data fetched and stored in FOLDER: ${xmlType} for URL: ${supplierXMLUrl}`;
}

function logFetchedXMLDataWithWhiteSpace(xmlType, supplierXMLUrl) {
    console.log('\n'); // Add white space at the top
    const logMessage = logFetchedXMLData(xmlType, supplierXMLUrl);
    console.log(logMessage);
    console.log('\n'); // Add white space at the bottom
}
  
module.exports = { logFetchedXMLData, logFetchedXMLDataWithWhiteSpace };
  