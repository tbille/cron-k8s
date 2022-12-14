import type { NextApiRequest, NextApiResponse } from "next";

import Cookies from "cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res);

  if (cookies.get("token")) {
    cookies.set("token", null);
  }

  res.status(200).redirect("/");
}
