import * as fs from "node:fs/promises";

const DIGIT_MAP = new Map<string, number>([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

function findFirstLastDigit(str: string): [number, number] {
  const digits = Array.from(
    str.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)
  )
    .map((v) => v[1])
    .map((v) => (v.length > 1 ? DIGIT_MAP.get(v)! : parseInt(v)));
  if (!digits || digits.length < 1) {
    throw new Error(`This line don\'t contain two digits: ${str}`);
  }

  if (digits.some(Number.isNaN)) {
    throw new Error(`This line contains NaN: ${str}`);
  }
  return [digits[0], digits[digits.length - 1]];
}

try {
  const data = await fs.readFile("./input.txt", { flag: "r" });
  const lines = data.toString().trim().split("\n");
  const result = lines.map(findFirstLastDigit).reduce((prev, curr) => {
    return prev + curr[0] * 10 + curr[1];
  }, 0);
  console.log(result);
} catch (err) {
  console.error(err);
}
