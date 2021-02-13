import * as unified from "unified";
import * as markdown from "remark-parse";
import * as is from "unist-util-is";
import {
  Break,
  Content,
  Heading,
  Link,
  List,
  ListItem,
  Paragraph,
  Root,
  Strong,
  Text,
  ThematicBreak,
} from "mdast";

const processor = unified().use(markdown);

export function parseMarkdown(str: string): string {
  const root = processor.parse(str);
  if (is<Root>(root, "root")) {
    return childrenToString(root.children);
  }
  return "";
}

function childrenToString(children: Content[]): string {
  return children.reduce((all, current) => all + contentToString(current), "");
}

// @see https://github.com/remarkjs/remark/issues/444
function contentToString(c: Content): string {
  if (is<Heading>(c, "heading")) {
    return childrenToString(c.children) + "\n";
  } else if (is<Text>(c, "text")) {
    return c.value;
  } else if (is<Strong>(c, "strong")) {
    return childrenToString(c.children);
  } else if (is<Paragraph>(c, "paragraph")) {
    return childrenToString(c.children) + "\n";
  } else if (is<Break>(c, "break")) {
    return "\n";
  } else if (is<List>(c, "list")) {
    return childrenToString(c.children);
  } else if (is<ListItem>(c, "listItem")) {
    return "・" + childrenToString(c.children);
  } else if (is<ThematicBreak>(c, "thematicBreak")) {
    return "\n";
  } else if (is<Link>(c, "link")) {
    return childrenToString(c.children) + "\n" + c.url;
  } else {
    console.log(`unexpected type: ${c}`);
  }
  return "";
}
