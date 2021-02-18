import express from "express";
import AWS from "aws-sdk";
import boom from "@hapi/boom";

const { AWS_ID, AWS_SECRET, BUCKET_NAME } = process.env;
const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

export const uploadController = async (req, res, next) => {
  const { filename, mimetype, extension } = req.body;

  if (extension !== "pdf") {
    return next(boom.unsupportedMediaType("Invalid file type."));
  }

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    ACL: "public-read-write",
    ContentType: mimetype,
    Key: `${filename}.${extension}`,
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.json({ url });
  } catch (err) {
    console.error(err);
    next(boom.badImplementation("Unable to upload file."));
  }
};

export const deleteController = async (req, res) => {
  const { key } = req.body;

  if (!key) {
    next(boom.badImplementation("Unable to upload file."));
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params, function (err) {
    if (err) {
      next(boom.badImplementation("Unable to upload file."));
    } else {
      res.send("ok");
    }
  });
};

export default router;
