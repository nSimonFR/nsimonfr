import ReactPDF from "@react-pdf/renderer";
import fs from 'fs';
import generatePDFFromMarkdown from './src';

const outFolder = `${__dirname}/dist`;
if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

const frenchMD = fs.readFileSync("./markdown/FRENCH.md");
const frenchPDF = generatePDFFromMarkdown(frenchMD.toString());
ReactPDF.render(frenchPDF, `${outFolder}/french.pdf`);

const englishMD = fs.readFileSync("./markdown/ENGLISH.md");
const englishPDF = generatePDFFromMarkdown(englishMD.toString());
ReactPDF.render(englishPDF, `${outFolder}/english.pdf`);