const fs = require('fs');
const path = require('path');

// Natural alphanumeric sort comparator
function naturalCompare(a, b) {
  const ax = [];
  const bx = [];
  
  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || '']);
  });
  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    bx.push([$1 || Infinity, $2 || '']);
  });
  
  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }
  
  return ax.length - bx.length;
}

// Sort sitemap XML file
function sortSitemap(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the XML declaration and urlset opening tag
    const xmlDeclarationMatch = content.match(/<\?xml[^>]+>\s*/);
    const urlsetOpenMatch = content.match(/<urlset[^>]*>/);
    const urlsetCloseMatch = content.match(/<\/urlset>/);
    
    if (!xmlDeclarationMatch || !urlsetOpenMatch || !urlsetCloseMatch) {
      console.error(`Invalid sitemap format in ${filePath}`);
      return;
    }
    
    const xmlDeclaration = xmlDeclarationMatch[0];
    const urlsetOpen = urlsetOpenMatch[0];
    
    // Extract all <url> entries
    const urlRegex = /<url>[\s\S]*?<\/url>/g;
    const urls = content.match(urlRegex) || [];
    
    // Extract the <loc> value from each URL for sorting
    const urlsWithLoc = urls.map(url => {
      const locMatch = url.match(/<loc>(.*?)<\/loc>/);
      const loc = locMatch ? locMatch[1] : '';
      return { url, loc };
    });
    
    // Sort by natural alphanumeric order
    urlsWithLoc.sort((a, b) => naturalCompare(a.loc, b.loc));
    
    // Reconstruct the sitemap
    const sortedUrls = urlsWithLoc.map(item => item.url).join('\n');
    const sortedContent = `${xmlDeclaration}${urlsetOpen}\n${sortedUrls}\n</urlset>`;
    
    // Write back to file
    fs.writeFileSync(filePath, sortedContent, 'utf8');
    console.log(`✓ Sorted ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error sorting ${filePath}:`, error.message);
  }
}

// Main execution
const publicDir = path.join(__dirname, '../public');
const sitemapFiles = fs.readdirSync(publicDir)
  .filter(file => file.startsWith('sitemap-') && file.endsWith('.xml'));

if (sitemapFiles.length === 0) {
  console.log('No sitemap files found to sort.');
} else {
  sitemapFiles.forEach(file => {
    sortSitemap(path.join(publicDir, file));
  });
  console.log(`Sorted ${sitemapFiles.length} sitemap file(s).`);
}
