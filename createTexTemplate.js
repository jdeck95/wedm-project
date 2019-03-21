const fs = require('fs');

const createTexTemplate = function (moduleList){
  const pflicht = [];
  const wahl = [];

  moduleList.forEach(module => {
    if (module.moduleArt.trim() === 'Pflichtmodul') {
      pflicht.push(module.filename.trim());
    } else {
      wahl.push(module.filename.trim());
    }
  });

  console.log(pflicht);

  let replacement = `
    \\noindent \\textbf{Pflichtmodule}
    \\begin{itemize}
    \\setlength\\itemsep{-0.5em}
    ${pflicht.map(key => {
      return `\\item ${key}\n`;
    })}
    \\end{description}
    \\newpage
    \\noindent \\textbf{Wahlpflichtmodule}
    \\begin{itemize}
    \\setlength\\itemsep{-0.5em}
    ${wahl.map(key => {
      return `\\item ${key}\n`;
    })}
    \\end{description}
  `;

  fs.readFile('./latex/template.tex', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/%modulelist/g, replacement);
  
    fs.writeFile('./latex/moduleTemplate.tex', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });

};

module.exports = createTexTemplate;