import * as fs from "node:fs/promises";

function findFirstLastDigit(str: string): [number, number] {
  const digits = str.match(/\d/g)?.map((v) => parseInt(v));
  if (!digits || digits.length < 1) {
    throw new Error(`This line don\'t contain two digits: ${str}`);
  }

  if (digits.some(Number.isNaN)) {
    throw new Error(`This line contains NaN: ${str}`);
  }
  return [digits[0], digits[digits?.length - 1]];
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
