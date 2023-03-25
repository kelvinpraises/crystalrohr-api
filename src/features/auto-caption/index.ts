import { Request, Response } from "express";
import { errors, results } from "../../utils/enums.js";
import responseHandler from "../../utils/response-handler.js";
import autoCaption from "./application/index.js";

export default async (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  const result = await autoCaption(imageUrl);

  switch (result.state) {
    case results.success:
      //handle audio blob
      const blob = result.data.msg as Blob;
      const buf = await blob.arrayBuffer();

      res.type(blob.type).send(Buffer.from(buf));
      break;

    case results.failed:
      responseHandler({ res, status: 400, data: errors.generic });
      break;

    default:
      responseHandler({ res, status: 400, data: errors.generic });
      break;
  }
};
