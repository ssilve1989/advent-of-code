import { getText } from "../../common/file.js";

const input = await getText("sample.txt");

let dial = 50;
let password = 0;

const regex = /(L|R)(\d+)/;

for (const line of input.split("\n")) {
	const groups = line.match(regex);

	if (groups) {
		const [_, direction, valueStr] = groups;
		const value = Number.parseInt(valueStr, 10);

		let passes = 0;
		if (direction === "R") {
			passes = Math.floor((dial + value) / 100) - Math.floor(dial / 100);
			dial = (dial + value) % 100;
		} else {
			passes =
				Math.floor((dial - 1) / 100) - Math.floor((dial - value - 1) / 100);
			dial = (dial - value) % 100;
		}

		if (dial < 0) {
			dial += 100;
		}

		// console.log({ dial, passes, direction, value });
		password = password + passes;
	}
}

console.log("Password:", password);
