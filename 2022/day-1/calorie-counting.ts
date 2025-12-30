import path from "node:path";
import {
	bufferWhen,
	distinct,
	filter,
	map,
	mergeMap,
	reduce,
	scan,
	take,
	takeLast,
	toArray,
} from "rxjs";
import { getInputStream } from "../../common/get-input-stream.js";

const lines$ = getInputStream(path.resolve(`${__dirname}/input.txt`));

const calories$ = lines$.pipe(
	filter((value) => value !== ""),
	bufferWhen(() => lines$.pipe(filter((value) => value === ""))),
	map((calories) =>
		calories
			.map((value) => Number.parseInt(value as string, 10))
			.filter((value) => !Number.isNaN(value))
			.reduce((acc, value) => acc + value, 0),
	),
);

const mostCalories$ = calories$.pipe(
	scan((prev, curr) => Math.max(prev, curr), 0),
	distinct(),
	takeLast(1),
);

const topThreeCombinedCalories$ = calories$.pipe(
	toArray(),
	map((calories) => calories.sort((a, b) => b - a)),
	mergeMap((calories) => calories),
	take(3),
	reduce((acc, curr) => acc + curr, 0),
);

mostCalories$.subscribe({
	next: (calories) =>
		console.log(`The elf with the most calories has ${calories} calories`),
});

topThreeCombinedCalories$.subscribe({
	next: (calories) =>
		console.log(`The top three elves are carrying ${calories} calories `),
});
