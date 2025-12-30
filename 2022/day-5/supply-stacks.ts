import fs from "node:fs";
import path from "node:path";

function simulate(lines: string[], isCrateMover9001: boolean) {
	const stacks = lines
		.slice(0, 8)
		.map((line) =>
			line
				.replaceAll(/\s\s\s\s/g, " ")
				.replaceAll(/\[|\]/g, "")
				.split(" "),
		)
		.reduce(
			(stacks, line) => {
				for (let index = 0; index < line.length; index++) {
					const char = line[index];
					if (char) {
						stacks[index].push(char);
					}
				}
				return stacks;
			},
			Array.from({ length: 9 }).map(() => []) as string[][],
		);

	const performMove = ([move, from, to]: [number, number, number]) => {
		const source = from - 1;
		const target = to - 1;
		const items = stacks[source].splice(0, move);
		const ordered = isCrateMover9001 ? items : items.reverse();
		stacks[target].unshift(...ordered);
	};

	lines
		.slice(10)
		.filter(Boolean)
		.map((line) => line.match(/\d+/g))
		.map((line) => line?.map(Number))
		.forEach((line) => {
			if (line && line.length === 3) {
				performMove([line[0], line[1], line[2]]);
			}
		});

	return stacks.map((stack) => stack[0]).join("");
}

const lines = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
	.split("\n");

console.log(simulate(lines, true));
console.log(simulate(lines, false));
