// async function saveToFile(name: string, data: string) {
//     const options: any = {
//       suggestedName: `${name}.sycc`,
//       types: [
//         {
//           description: 'SYCC files',
//           accept: { 'application/x-sycc': ['.sycc'] },
//         },
//       ],
//     };
  
//     if (!window) {
//       // If showSaveFilePicker is not available, fall back to old-style file saving
//       const blob = new Blob([data], { type: 'application/x-sycc' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${name}.sycc`;
//       link.click();
//       return null;
//     }
  
//     try {
//       const fileHandle = await window.showSaveFilePicker(options);
//       const writable = await fileHandle.createWritable();
//       await writable.write(data);
//       await writable.close();
//       return fileHandle;
//     } catch (err) {
//       console.error('Error saving file', err);
//       return null;
//     }
//   }
  
//   async function openFile(): Promise<FileSystemFileHandle | null> {
//     const options: OpenFilePickerOptions = {
//       types: [
//         {
//           description: 'SYCC files',
//           accept: { 'application/x-sycc': ['.sycc'] },
//         },
//       ],
//     };
  
//     if (!window.showOpenFilePicker) {
//       // If showOpenFilePicker is not available, fall back to old-style file opening
//       const input = document.createElement('input');
//       input.type = 'file';
//       input.accept = '.sycc';
//       input.addEventListener('change', async () => {
//         const file = input.files?.[0];
//         if (!file) return null;
//         const fileHandle = await (window as any).chooseFileSystemEntries?.({
//           type: 'open-file',
//           accepts: [{ mimeTypes: ['application/x-sycc'], extensions: ['sycc'] }],
//         }) ?? null;
//         if (!fileHandle) return null;
//         const writable = await fileHandle.createWritable();
//         await writable.write(await file.arrayBuffer());
//         await writable.close();
//         return fileHandle;
//       });
//       input.click();
//       return null;
//     }
  
//     try {
//       const [fileHandle] = await window.showOpenFilePicker(options);
//       return fileHandle;
//     } catch (err) {
//       console.error('Error opening file', err);
//       return null;
//     }
//   }
  
//   async function readFile(fileHandle: FileSystemFileHandle): Promise<string> {
//     const file = await fileHandle.getFile();
//     const buffer = await file.arrayBuffer();
//     return new TextDecoder().decode(buffer);
//   }
  

// export {
//     saveToFile,
//     openFile
// };
export {}
