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
      "INSERT INTO snowman (name) VALUES (?);",
      [req.body.name],
      (err: QueryError | null, result: any) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ data: "fail" });
        }
        console.log(result);
        return res.status(201).json({ data: result.insertId });
      }
    );
  } else {
    return res.status(404).json({ data: "not found" });
  }
}
