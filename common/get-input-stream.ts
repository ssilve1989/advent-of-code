import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fromEvent, type Observable, share, takeUntil } from "rxjs";

export function getInputStream(file: string): Observable<string> {
	const rl = readline.createInterface({
		input: fs.createReadStream(path.resolve(file)),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const close$ = fromEvent(rl, "close");
	const lines$ = fromEvent(rl, "line") as Observable<string>;
	return lines$.pipe(share(), takeUntil(close$)) as Observable<string>;
}

/**
 * Get a ReadableStream for the given file path
 * Uses Bun's file streaming capabilities
 * @param filePath
 * @returns
 */
export function getReadableStream(
	filePath: string,
): ReadableStream<Uint8Array<ArrayBuffer>> {
	const file = Bun.file(filePath);
	return file.stream();
}
