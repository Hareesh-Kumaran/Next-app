import { connectToDB } from "@/utils/database";
import PromptModel from "@/Models/prompt.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    console.log(params.id);
    const prompt = await PromptModel.findById(params.id).populate("creator");


    return NextResponse.json({
      message: "fetched successfully",
      ok: true,
      prompt,
    });
  } catch (error) {
    console.log("@Error in the getById function", error);
  }
}

export async function PATCH(req,{params})
{
try {
  await connectToDB();
   const data = await req.json();
   console.log("Patch data",data);
  await PromptModel.findByIdAndUpdate(params.id,data);
  return NextResponse.json({
    message: "updated successfully",
    ok: true,
  });
} catch (error) {
  console.log("@Error in the PatchById function", error);
}
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    await PromptModel.findByIdAndDelete(params.id);
     
    return NextResponse.json({
      message: "deleted successfully",
      ok: true,
    });
  } catch (error) {
    console.log("@Error in the deleteById function", error);
  }
}
