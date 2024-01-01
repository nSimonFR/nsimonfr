import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import Markdown from "../markdown/EN_SHORT.md?raw";
import { generatePDFFromMarkdown } from "../src";

const PDF = generatePDFFromMarkdown(Markdown);
const App = () => (
  <PDFViewer style={{ width: "100%", height: "100%" }}>{PDF}</PDFViewer>
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
