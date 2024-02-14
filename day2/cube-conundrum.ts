import * as fs from "node:fs/promises";

const cubeLimit = new Map<string, number>([
  ["red", 12],
  ["green", 13],
  ["blue", 14],
]);

function exceedLimit(line: string): boolean {
  const cubeSets = line
    .split(";")
    .map((v) => v.matchAll(/(\d*) (green|blue|red)/g))
    .map((v) => Array.from(v))
    .reduce((prev, curr) => prev.concat(curr));

  if (cubeSets.some((v) => v.length < 3))
    throw new Error(`Can parse this line properly: ${line}`);

  return cubeSets.some((v) => {
    const color = v[2];
    const number = parseInt(v[1]);
    return number > cubeLimit.get(color)!;
  });
}

function setPower(line: string): number {
  const cubeSets = line
    .split(";")
    .map((v) => v.matchAll(/(\d*) (green|blue|red)/g))
    .map((v) => Array.from(v))
    .reduce((prev, curr) => prev.concat(curr));

  const set = new Map<string, number>();
  cubeSets.forEach((v) => {
    if (v.length < 3)
      throw new Error(`Can parse this line properly: ${line}\n${v.length}`);
    (set.get(v[2]) ?? 0) < parseInt(v[1]) && set.set(v[2], parseInt(v[1]));
  });

  return Array.from(set.entries()).reduce((prev, curr) => prev * curr[1], 1);
}

try {
  const data = await fs.readFile("./input.txt");
  const lines = data.toString().trim().split("\n");
  let result = 0;
  lines.forEach((line) => {
    result += setPower(line);
  });
  console.log(result);
} catch (err) {
  console.log(err);
}
