import { useState } from "react";

import API from "../services/api";
import { notifySuccess } from "../utils/notify";

const ProfileUpload = () => {
  const [file, setFile] =
    useState(null);

  const upload = async () => {
    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const uploadResponse =
      await API.post(
        "/upload",
        formData
      );

    await API.put(
      "/auth/profile-image",
      {
        profileImage:
          uploadResponse.data.imageUrl
      }
    );

    notifySuccess("Profile Updated");
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={upload}
      >
        Upload
      </button>
    </div>
  );
};

export default ProfileUpload;