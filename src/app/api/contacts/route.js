import { connectToDatabase } from "../../../utils/mongodb";
import { getServerSession } from "next-auth/next";
import Joi from "joi";

const querySchema = Joi.object({
  userId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function GET(req) {
  const session = await getServerSession(req);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = new URL(req.url).searchParams.get("userId");

  const { error } = querySchema.validate({ userId });
  if (error) {
    return new Response(JSON.stringify({ message: "Invalid query parameters", error: error.details }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { db } = await connectToDatabase();
    const contacts = await db.collection("contacts").find({ userId }).toArray();

    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching contacts", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
