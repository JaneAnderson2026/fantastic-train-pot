const fs = require('fs');
const path = require('path');

// Input and output files
const inputFile = path.join(__dirname, 'blog2.html');
const outputFile = path.join(__dirname, 'blog2.js');

// Read HTML file as UTF-8
const htmlContent = fs.readFileSync(inputFile, 'utf8');

// Escape special characters for JS template literal
const escapedHtml = htmlContent
  .replace(/\\/g, '\\\\')   // escape backslashes
  .replace(/`/g, '\\`')     // escape backticks
  .replace(/\$\{/g, '\\${'); // escape ${

// Wrap it in a JS function that writes to document
const jsContent = `
(function(){
  document.open();
  document.write(\`${escapedHtml}\`);
  document.close();
})();
`;

// Save JS file in UTF-8
fs.writeFileSync(outputFile, jsContent, { encoding: 'utf8' });

console.log("✅ HTML has been converted to blog2.js");
