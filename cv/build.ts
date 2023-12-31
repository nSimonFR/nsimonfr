import ReactPDF from "@react-pdf/renderer";
import fs from 'fs';
import generatePDFFromMarkdown from './src';

const outFolder = `${__dirname}/dist`;
if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

const french = generatePDFFromMarkdown("./markdown/FRENCH.md");
ReactPDF.render(french, `${outFolder}/french.pdf`);

const english = generatePDFFromMarkdown("./markdown/ENGLISH.md");
ReactPDF.render(english, `${outFolder}/english.pdf`);