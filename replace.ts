import fs from 'fs';

function replaceInFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/neutral/g, 'slate');
  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${filePath}`);
}

const files = [
  'src/components/Layout.tsx',
  'src/pages/Home.tsx',
  'src/pages/Search.tsx',
  'src/pages/Dashboard.tsx',
  'src/pages/Profile.tsx'
];

files.forEach(replaceInFile);
