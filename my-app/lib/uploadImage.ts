import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  console.log("1111111");
  console.log(process.env.BUCKET_ID);
  const fileUploaded = await storage.createFile(
    "65bf8dd345c918bbe215",
    ID.unique(),
    file
  );

  console.log("222222222");
  console.log(fileUploaded);
  return fileUploaded;
};

export default uploadImage;
