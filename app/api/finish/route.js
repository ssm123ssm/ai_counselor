import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    console.log("Finish route");
    const body = await request.json();
    const content = body.messages.splice(5);

    // create a unique file name
    const fileName = `app/responses/file-${Date.now()}.json`;

    //write content to a json file
    await fsPromises.writeFile(fileName, JSON.stringify(content));

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log("error");
    return NextResponse.error(error);
  }
}
