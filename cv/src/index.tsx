import {
  Document,
  Font,
  Image,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { Token, Tokens } from "marked";
import React from "react";
import { createTw } from "react-pdf-tailwind";
import { parse, type parsedMarkdown } from "./parser";
import { Style } from "@react-pdf/types";

const path = (src: string) =>
  typeof window !== "undefined" ? src : `./public/${src}`;

Font.register({
  family: "Geist",
  format: "truetype",
  fonts: [
    {
      src: path("Geist-Regular.woff2"),
    },
    {
      src: path("Geist-Light.woff2"),
      fontStyle: "italic",
    },
    {
      src: path("Geist-Bold.woff2"),
      fontWeight: "bold",
    },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: "Geist",
    },
    extend: {
      colors: {
        default: "#C2E6FF",
        primary: "#0090FF",
        secondary: "#3B9EFF",
        tertiary: "#70B8FF",
        background: "#0D1520",
      },
    },
  },
});

const TextRender = ({ content }: { content?: Token }) => {
  if (!content) {
    return null;
  }
  if (typeof content === "string") {
    return content;
  }
  if (content.type === "link") {
    return (
      <Link src="https://github.com" style={tw("text-tertiary")}>
        {content?.text}
      </Link>
    );
  }
  if (content.type === "space") {
    return "\n";
  }
  return content.raw;
};

const ContentRender = ({
  markdown,
  style,
}: {
  markdown: parsedMarkdown;
  style?: Style;
}) => {
  if (!markdown.content) return null;

  return (
    <Text style={style}>
      {markdown.content.map((c, i) => (
        <TextRender key={i} content={c}></TextRender>
      ))}
    </Text>
  );
};

const SubSubSection = ({ markdown }: { markdown: parsedMarkdown }) =>
  Object.entries(markdown)
    .filter(([key]) => key !== "content")
    .map(([key, md]) => (
      <View key={key} style={tw("my-1")}>
        <Text style={tw("text-base font-bold text-tertiary")} id={key}>
          {key}
        </Text>
        <ContentRender markdown={md as parsedMarkdown}></ContentRender>
      </View>
    ));

const SubSection = ({ markdown }: { markdown: parsedMarkdown }) =>
  Object.entries(markdown)
    .filter(([key]) => key !== "content")
    .map(([key, md]) => (
      <View key={key}>
        <Text style={tw("text-2xl font-bold text-secondary")} id={key}>
          {key}
        </Text>
        <ContentRender markdown={md as parsedMarkdown}></ContentRender>
        <SubSubSection markdown={md as parsedMarkdown} />
      </View>
    ));

const Section = ({
  title,
  markdown,
  notitle,
  nocontent,
}: {
  title: string;
  markdown: parsedMarkdown;
  notitle?: boolean;
  nocontent?: boolean;
}) => (
  <View>
    {!notitle && (
      <Text style={tw("text-2xl font-bold text-primary")} id={title}>
        {title}
      </Text>
    )}
    {!nocontent && (
      <ContentRender markdown={markdown as parsedMarkdown}></ContentRender>
    )}
    <SubSection markdown={markdown} />
  </View>
);

const MyImage = ({ src }: { src: string }) => (
  <View style={tw("bg-primary rounded-full p-1 mb-5")}>
    <Image src={src} style={tw("rounded-full")} />
  </View>
);

const PDF = (markdown: parsedMarkdown) => {
  const [intro, ...sections] = Object.entries(markdown);
  const [title, content] = intro;
  const subtitle = (
    (intro[1] as parsedMarkdown).content?.[0] as Tokens.Paragraph
  ).text;

  return (
    <Document
      title="CV.PDF"
      author="nSimonFR"
      language="fr"
      pageLayout="twoColumnLeft"
    >
      <Page
        size="A4"
        style={tw("bg-background text-xs text-default py-4")}
        wrap
      >
        <View style={tw("m-4 mb-[20px] flex-row")} wrap>
          <View style={tw("m-2 grow basis-1/5 text-right text-xs")}>
            <MyImage src={path("me.png")} />
            <Section
              title={title}
              markdown={content as parsedMarkdown}
              notitle
              nocontent
            ></Section>
          </View>
          <View style={tw("m-1 grow basis-4/5")}>
            <Text style={tw("text-5xl font-bold text-primary")}>{title}</Text>
            <Text style={tw("text-2xl font-bold text-tertiary")}>
              {subtitle}
            </Text>
            {sections.map(([sTitle, sMarkdown], index) => (
              <Section
                key={index}
                title={sTitle}
                markdown={sMarkdown as parsedMarkdown}
              ></Section>
            ))}
          </View>
        </View>
        <View
          style={tw("flex items-center absolute bottom-0 p-1 w-full")}
          fixed
        >
          <Link
            style={tw("max-w-full no-underline text-[7px] text-tertiary")}
            src="https://github.com/nSimonFR/nSimonFR/tree/main/cv"
          >
            nSimon.fr (CV generated with react-pdf & tailwind from markdown)
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export const generatePDFFromMarkdown = (content: string) => {
  const markdown = parse(content);
  return PDF(markdown);
};

export default generatePDFFromMarkdown;
