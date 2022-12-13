// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type IUser from "../../types/user";
import { getUserInfo } from "../../helpers/auth";

import Cookies from "cookies";

interface BaseError<ErrorData> {
  code: number;
  data?: ErrorData;
  message: string;
}

export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");
  const response = await fetch(
    `${process.env.POCKETBASE_URL}/api/collections/users/auth-refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );

  const user = await response.json();

  cookies.set(
    "token",
    user.token,
    process.env.ENVIROMENT === "production" ? { secure: true } : {}
  );

  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | BaseError<null>>
) {
  try {
    const user = await getUser(req, res);
    return res.status(200).json(getUserInfo(user.record));
  } catch (error) {
    return res.status(error.status ?? 500).json({ ...error.data });
  }
}
