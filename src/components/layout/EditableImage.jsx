import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  // async function handleFileChange(ev) {
  //   const files = ev.target.files;
  //   if (files?.length === 1) {
  //     const data = new FormData();
  //     data.set("file", files[0]);

  //     const uploadPromise = await fetch("/api/upload", {
  //       method: "POST",
  //       body: data,
  //     }).then((response) => {
  //       if (response.ok) {
  //         return response.json().then((link) => {
  //           setLink(link);
  //         });
  //       }
  //       throw new Error("Something went wrong");
  //     });

  //     // await toast.promise(uploadPromise, {
  //     //   loading: "Uploading...",
  //     //   success: "Upload complete",
  //     //   error: "Upload error",
  //     // });
  //   }
  // }

  console.log(link);

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          const link = await response.json();
          setLink(link);
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
