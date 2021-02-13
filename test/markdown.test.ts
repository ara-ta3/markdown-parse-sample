import { parseMarkdown } from "../src/Markdown";

test("heading test", () => {
  const md = `# heading
aaa`;
  expect(parseMarkdown(md)).toBe("heading\naaa\n");
});
