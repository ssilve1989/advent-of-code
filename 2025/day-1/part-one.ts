import { getText } from "../../common/file.js";

const input = await getText("./input.txt");

let dial = 50;
let password = 0;
const regex = /(L|R)(\d+)/;

for (const line of input.split("\n")) {
	const groups = line.match(regex);

	if (groups) {
		const [_, direction, valueStr] = groups;
		const value = Number.parseInt(valueStr, 10);
		const move = direction === "L" ? -value : value;

		dial = dial + move;
		if (dial % 100 === 0) {
			password = password + 1;
		}
	}
}

console.log("Password: ", password);
