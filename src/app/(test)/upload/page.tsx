"use client";
import {Upload} from "tus-js-client";
export default function UploadPage() {
  const handleUploadFile = (e: any) => {
    const file = e.target.files[0];

    const upload = new Upload(file, {
      endpoint: "http://localhost:3001/api/files",
      retryDelays: [0, 3000, 5000, 10000, 20000],
      chunkSize: 8* 1024,
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: function (error) {
        console.log("Failed because: " + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
      },
    });

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUploadFile(e)} />
    </div>
  );
}
