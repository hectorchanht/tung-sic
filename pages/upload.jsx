import { Button, Input } from '@chakra-ui/react';
import { useState } from "react";


export default function PrivatePage() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [response, setResponse] = useState('');

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async (event) => {
    if (!image) return;
    const body = new FormData();
    body.append("file", image);
    const res = await fetch("/api/file", {
      method: "POST",
      body
    });
    setResponse(await res.text());
  };

  return (
    <div>
      <div>
        <Input type="file" name="myImage" onChange={uploadToClient} />
        <Button
          width='100%'
          isDisabled={!image}
          onClick={uploadToServer}
        >
          Send to server
        </Button>
        <p>{response}</p>
        <img src={createObjectURL || undefined} alt={createObjectURL ? '' : createObjectURL} />
      </div>
    </div>
  );
}
