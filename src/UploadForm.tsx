import * as React from 'react';
import { useState } from 'react';
import { NFTStorage } from 'nft.storage';

const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || '';
const client = new NFTStorage({ token });

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewURL, setimagePreviewURL] =  useState<string | null>(null);

  const $imagePreview = imagePreviewURL ? (
    <img src={imagePreviewURL} alt="Preview Image" />
  ) : (
    <div className="previewText">Please select an Image for Preview</div>
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      console.log(file);
      client.store({ name: file.name, description: ' ', image: file }).then(res => {
        console.log(res.data);
      })
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setFile(file);
        setimagePreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="file" onChange={onChange} />
        <button type="submit" className="submit">
          Upload Image
        </button>
      </form>
      <div>{$imagePreview}</div>
    </div>
  );  
}

export default UploadForm;

// Upload file to server