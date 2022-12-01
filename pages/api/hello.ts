import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../src/common/config/db/db";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    db.query("SELECT * FROM test", (err: any, result: any) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ name: result[0].count });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
