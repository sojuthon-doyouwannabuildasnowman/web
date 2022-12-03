import { QueryError } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../src/common/config/db/db";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    db.query(
      "SELECT COUNT(*) FROM snowman WHERE name=?;",
      [req.body.name],
      (err: QueryError | null, result: any) => {
        if (err) return res.status(500).json({ data: "fail" });
        if (result[0]["COUNT(*)"] === 0) {
          return res.status(200).json({ data: false });
        }
        return res.status(200).json({ data: true });
      }
    );
  } else {
    return res.status(404).json({ data: "not found" });
  }
}
