import API from "../api/axios";

export const uploadImage = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const res = await API.post(
    "/upload/upload-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.image_url;

};