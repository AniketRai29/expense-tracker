const multer =
  require("multer");

const path =
  require("path");

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        Date.now() +
          path.extname(
            file.originalname
          )
      );
    }
  });

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes =
    /jpg|jpeg|png|webp/;

  const extName =
    allowedTypes.test(
      path.extname(
        file.originalname
      )
    );

  const mimeType =
    allowedTypes.test(
      file.mimetype
    );

  if (
    extName &&
    mimeType
  ) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only image files allowed"
    )
  );
};

module.exports = multer({
  storage,
  fileFilter
});