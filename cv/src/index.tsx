import { Document, Page, Text, View } from "@react-pdf/renderer";
import fs from "fs";
import React from "react";
import { createTw } from "react-pdf-tailwind";
import parser from "./parser";

const tw = createTw({
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        custom: "#ab47bc",
      },
    },
  },
});

const PDF = (json: string) => (
  <Document>
    <Page size="A4" style={tw("flex-row bg-[#E4E4E4]")}>
      <View style={tw("m-10 p-10 grow")}>
        <Text>{json}</Text>
      </View>
    </Page>
  </Document>
);

const generatePDFFromMarkdown = (path: string) => {
  const french = fs.readFileSync(path);
  const parsed = parser(french.toString());
  const json = JSON.stringify(parsed);

  return PDF(json);
};

export default generatePDFFromMarkdown;
