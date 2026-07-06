const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes("L'Aura")) {
    content = content.replace(/L'Aura/g, 'Restro');
    changed = true;
  }
  if (content.includes('>${')) {
    content = content.replace(/>\$\{/g, '>₹{');
    changed = true;
  }
  if (content.includes('Total: ${')) {
    content = content.replace(/Total: \$\{/g, 'Total: ₹{');
    changed = true;
  }
  if (content.includes('+$${')) {
    content = content.replace(/\+\$\$\{/g, '+₹${');
    changed = true;
  }
  if (content.includes('              ${displayTotal')) {
    content = content.replace(/              \$\{displayTotal/g, '              ₹{displayTotal');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
console.log('Done');
