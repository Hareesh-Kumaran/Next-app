import PromptModel from "@/Models/prompt.model";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const promptList = await PromptModel.find({ creator: params.id }).populate(
      "creator"
    );
    return NextResponse.json({
      message: "fetched successfully",
      ok: true,
      promptList,
    });
  } catch (error) {
    console.log("@Error in the getById function", error);
  }
}
