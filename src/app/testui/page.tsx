// -- MSG_WARNING: remove this page. Its for only testing
"use client";
import axios from "axios"

const page = () => {
  const handleUploadFile = async (e) => {
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    formData.append("caption", "My image title" )
    formData.append("alt", "My image description" )
    const response = await fetch("http://localhost:3000/api/v1/upload/image", {
      method: "POST",
      body: formData,
    });
    await response.body!.pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream({
        transform(chunk, controller) {
            console.log("mahin", JSON.parse(chunk));
            controller.enqueue(chunk);
        }
    }))
    .pipeTo(
      new WritableStream({
        write(chunk) {
           
        },
      })
    );
    console.log("hello", response);
  };
  return (
    <div>
      <input type="file" onChange={handleUploadFile} />
    </div>
  );
};

export default page;
