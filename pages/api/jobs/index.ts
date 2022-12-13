// deno-lint-ignore-file
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../whoami";
import { getAdminToken } from "../../../helpers/auth";

const getJobsByUser = async (userId: string) => {
  const adminToken = await getAdminToken();

  const response = await fetch(
    `${process.env.POCKETBASE_URL}/api/collections/jobs/records?filter=user='${userId}'`,
    {
      headers: {
        Authorization: `${adminToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser(req, res);
  const jobs = await getJobsByUser(user.record.id);
  res.status(200).json(jobs);
}
