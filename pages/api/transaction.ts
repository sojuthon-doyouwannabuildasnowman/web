import { QueryError } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../src/common/config/db/db";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    db.query("SELECT * FROM test", (err: QueryError | null, result: any) => {
      if (err) throw err;
      console.log(result);
      res.status(200).json({ data: result[0].count });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: "John Doe" });
  }
}
