// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Pocketbase from "pocketbase";
import type IUser from "../../types/user";
import { getUserInfo, getAdminToken } from "../../helpers/auth";

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
  const { name, email, password, password_confirm: passwordConfirm } = req.body;
  const cookies = new Cookies(req, res);
  const pocketbase = new Pocketbase(process.env.POCKETBASE_URL);

  try {
    const adminToken = await getAdminToken();
    const response = await fetch(
      `${process.env.POCKETBASE_URL}/api/collections/users/records`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${adminToken}`,
        },
        body: JSON.stringify({
          avatar: "",
          name,
          email,
          password,
          passwordConfirm: passwordConfirm,
          emailVisibility: false,
          verified: false,
          rows_limit: 10000,
        }),
      }
    );

    const user = await response.json();

    if (user.code === 400) {
      return res.status(400).json(user.data);
    }

    // Send verification email
    await fetch(
      `${process.env.POCKETBASE_URL}/api/collections/users/request-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    cookies.set(
      "token",
      user.token,
      process.env.ENVIROMENT === "production" ? { secure: true } : {}
    );

    return res.status(200).json(getUserInfo(user));
  } catch (error) {
    return res.status(error.status ?? 500).json({ ...error.data });
  }
}
