import { Document, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { createTw } from "react-pdf-tailwind";
import { parse, type parsedMarkdown } from "./parser";

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

const SectionRender = (markdown: parsedMarkdown) => (
  <View>
    {Object.entries(markdown)
      .filter(([key]) => key !== "content")
      .map(([key, markdown]) => (
        <View key={key}>
          <Text style={tw("text-2xl font-bold")}>{key}</Text>
          <Text style={tw("text-sm")}>
            {markdown && (markdown as parsedMarkdown).content}
          </Text>
          {SectionRender(markdown as parsedMarkdown)}
        </View>
      ))}
  </View>
);

const PDF = (markdown: parsedMarkdown) => (
  <Document>
    <Page size="A4" style={tw("flex-row bg-[#E4E4E4]")}>
      <View style={tw("m-10 p-10 grow")}>{SectionRender(markdown)}</View>
    </Page>
  </Document>
);

export const generatePDFFromMarkdown = (content: string) => {
  const markdown = parse(content);
  return PDF(markdown);
};

export default generatePDFFromMarkdown;
