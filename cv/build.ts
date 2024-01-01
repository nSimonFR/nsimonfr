import ReactPDF from "@react-pdf/renderer";
import fs from 'fs';
import generatePDFFromMarkdown from './src';

const outFolder = `${__dirname}/dist`;
if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

const generatePDF = (name: string) => {
  const frenchMD = fs.readFileSync(`./markdown/${name}.md`);
  const frenchPDF = generatePDFFromMarkdown(frenchMD.toString());
  ReactPDF.render(frenchPDF, `${outFolder}/${name}.pdf`);
};

generatePDF("SHORT");
generatePDF("LONG");