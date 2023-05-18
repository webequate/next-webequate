import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

const fetchProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const data = await db
      .collection("projects")
      .find({})
      .sort({ order: 1 })
      .toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

export default fetchProjects;
