import { Request, Response } from "express";
import { errors, results } from "../../utils/enums.js";
import responseHandler from "../../utils/response-handler.js";
import getBookmarks from "./application/index.js";

export default async (req: Request, res: Response) => {
  const { tag } = req.body;

  const result = await getBookmarks({ tag });

  switch (result.state) {
    case results.success:
      responseHandler({ res, status: 200, data: result.data });
      break;

    case results.failed:
      responseHandler({ res, status: 400, data: errors.generic });
      break;

    default:
      responseHandler({ res, status: 400, data: errors.generic });
      break;
  }
};

// result = {
//   state: "failed",
//   data: {
//     status: false,
//     msg: "An error occurred.",
//   },
// };

// result = {
//   state: "successful",
//   data: {
//     status: true,
//     msg: bookmarks,
//   },
// };