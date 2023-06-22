import { NextResponse, NextRequest } from "next/server";
import PromptModel from "@/Models/prompt.model";
import { connectToDB } from "@/utils/database";

export async function GET() {
  try {
    await connectToDB();
    const promptList = await PromptModel.find({}).populate("creator");
    return NextResponse.json({
      message: "fetched successfully",
      ok: true,
      promptList
    });
  } catch (error) {
    console.log("@Error in the get function",error);
  }
}

export async function POST(req, res) {
  try {
    const data = await req.json();
    await connectToDB();
    const newPrompt = new PromptModel(data);
    await newPrompt.save();
    return NextResponse.json({
      message: "Prompt Saved",
      ok: true,
    });
  } catch (error) {
    console.log("@Post method save-prompt", error);
    return NextResponse.json({
      message: "failed to save",
      ok: false,
    });
  }
}
