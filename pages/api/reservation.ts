import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../app/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { homeId, userId, startDate, endDate } = req.body;

    try {
      const data = await prisma.reservation.create({
        data: {
          userId: userId,
          endDate: endDate,
          startDate: startDate,
          homeId: homeId,
        },
      });

      res.status(201).json({
        message: "Reservation Created",
      });
    } catch (err: any) {
      console.log(err);
      res.status(400).json(err);
    }
  } else if (req.method == "DELETE") {
    const { id } = req.body;

    try {
      const data = await prisma.reservation.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: "Reservation Deleted",
      });
    } catch (err: any) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(400).json({
      message: "Invalid Method",
    });
  }
}
