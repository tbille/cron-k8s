// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type IUser from "../../types/user";
import { getUserInfo } from "../../helpers/auth";

import Cookies from "cookies";

interface ReqData {
  email: string;
  password: string;
}

interface BaseError<ErrorData> {
  code: number;
  data?: ErrorData;
  message: string;
}

export default async function handler(
  req: NextApiRequest<ReqData>,
  res: NextApiResponse<IUser | BaseError<null>>
) {
  const { email, password } = req.body;
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  try {
    const response = await fetch(
      `${process.env.POCKETBASE_URL}/api/collections/users/auth-with-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          identity: email,
          password,
        }),
      }
    );

    const user = await response.json();

    cookies.set(
      "token",
      user.token,
      process.env.ENVIROMENT === "production" ? { secure: true } : {}
    );
    return res.status(200).json(getUserInfo(user.record));
  } catch (error) {
    return res.status(error.status ?? 500).json({ ...error.data });
  }
}
