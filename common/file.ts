export function getText(filePath: string) {
	const file = Bun.file(filePath);
	return file.text();
}
