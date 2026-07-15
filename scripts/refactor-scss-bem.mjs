import fs from 'node:fs/promises';

import postcss from 'postcss';
import scss from 'postcss-scss';

const files = process.argv.slice(2);

function getBemBlock(selector) {
  const selectors = selector.split(',');
  const blocks = selectors.map((item) => item.trim().match(/^\.([a-z][a-z0-9-]*?)(?:__|--)/)?.[1]);

  if (blocks.some((block) => block === undefined) || new Set(blocks).size !== 1) {
    return undefined;
  }

  return blocks[0];
}

for (const file of files) {
  const source = await fs.readFile(file, 'utf8');
  const root = scss.parse(source, { from: file });
  const rules = [];

  root.walkRules((rule) => {
    if (rule.parent?.type !== 'rule') {
      rules.push(rule);
    }
  });

  for (const rule of rules) {
    const block = getBemBlock(rule.selector);

    if (block === undefined) {
      continue;
    }

    const wrapper = postcss.rule({ selector: `.${block}` });
    rule.selector = rule.selector
      .split(',')
      .map((selector) => selector.trim().replace(new RegExp(`^\\.${block}(?=__|--)`), '&'))
      .join(',\n');
    rule.replaceWith(wrapper);
    wrapper.append(rule);
  }

  await fs.writeFile(file, root.toResult({ syntax: scss }).css);
}
