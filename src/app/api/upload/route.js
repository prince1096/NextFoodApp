import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();

  //   console.log(data);

  if (data.get("file")) {
    console.log("We have file", data.get("file"));

    const file = data.get("file");

    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.MY_AWS_SECRET_KEY,
      },
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;

    console.log(ext, newFileName);

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const bucket = "princefoodordering";

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = "https://" + bucket + ".s3.amazonaws.com/" + newFileName;
    console.log("link", link, "link");
    return Response.json(link);
  }

  return Response.json("hello");
}
