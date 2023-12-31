import { marked, Tokens } from 'marked';

const getParentHeading = (headings: any, item: Tokens.Heading, result: any) => {
  const index = item.depth - 1;

  const currentHeading = headings[index];
  if (currentHeading) {
    headings.splice(index, headings.length - index);
  }
  headings.push(item.text);

  let parent;
  for (let i = 0; i < index; i++) {
    parent = !parent ? result[headings[i]] : parent[headings[i]];
  }

  return {
    headings: headings,
    parent: parent
  };
}

export type parsedMarkdown = { [key: string]: parsedMarkdown } & { content?: string };

export const parse = (markdown: string) => {
  const tokens = marked.lexer(markdown);

  let current: parsedMarkdown;
  let headings: any = [];
  let output = tokens.reduce((result, item) => {
    if (!current) {
      current = result;
    }
    if (item.type == 'heading') {
      if (!current || item.depth == 1) {
        headings = [];
        result[item.text] = {};
        current = result[item.text];
        headings.push(item.text);
      } else {
        var parentHeading = getParentHeading(headings, item as Tokens.Heading, result);
        headings = parentHeading.headings;
        current = parentHeading.parent;
        current[item.text] = {};
        current = current[item.text];
      }
    }
    else {
      current.content = current.content ? current.content + item.raw : item.raw;
    }
    return result;
  }, {} as parsedMarkdown);

  return output;
}