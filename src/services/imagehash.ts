import { createSHA256 } from 'hash-wasm';
import { IHasher } from 'hash-wasm/dist/lib/WASMInterface';

const chunkSize = 64 * 1024 * 1024;
let hasher: IHasher | null = null;

function hashChunk(chunk: Blob) {
  const fileReader = new FileReader();

  return new Promise<void>((resolve, reject) => {
    fileReader.onload = async(e) => {
      const view = new Uint8Array(e.target!.result as ArrayBuffer);
      (hasher as IHasher).update(view);
      resolve();
    };

    fileReader.onerror = (e) => { reject(e); };
    
    fileReader.readAsArrayBuffer(chunk);
  });
}

export async function readFileAndComputeHash(file: File) {
  if (hasher) {
    hasher.init();
  } else {
    hasher = await createSHA256();
  }

  const chunkNumber = Math.floor(file.size / chunkSize);

  for (let i = 0; i <= chunkNumber; i++) {
    const chunk = file.slice(
      chunkSize * i,
      Math.min(chunkSize * (i + 1), file.size)
    );
    await hashChunk(chunk);
  }

  const hash = hasher.digest();
  return hash;
};