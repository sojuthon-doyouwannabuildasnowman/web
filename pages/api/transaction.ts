import { QueryError } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../src/common/config/db/db";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { contributor, snowman_id, section, amount } = req.body;
    db.query(
      "INSERT INTO transaction (contributor, snowman_id, section, amount) VALUES (?, ?, ?, ?);",
      [contributor, snowman_id, section, amount],
      (err: QueryError | null, result: any) => {
        if (err) return res.status(500).json({ data: "fail" });
        if (section === "head") {
          db.query(
            "UPDATE snowman SET head=head+? WHERE id=?;",
            [amount, snowman_id],
            (err: QueryError | null, result: any) => {
              if (err) return res.status(500).json({ data: "fail" });
              return res.status(200).json({ data: "success" });
            }
          );
        } else if (section === "body") {
          db.query(
            "UPDATE snowman SET body=body+? WHERE id=?;",
            [amount, snowman_id],
            (err: QueryError | null, result: any) => {
              if (err) return res.status(500).json({ data: "fail" });
              return res.status(200).json({ data: "success" });
            }
          );
        } else {
          if (err) return res.status(500).json({ data: "fail" });
        }
      }
    );
  } else {
    return res.status(404).json({ data: "not found" });
  }
}
