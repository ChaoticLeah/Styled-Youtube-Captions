export function readFile(file: File, callback: (data: string) => void) {
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		callback(reader.result as string);
	};
}
