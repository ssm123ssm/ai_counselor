import { NextRequest, NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SGKEY);

export async function POST(request) {
  try {
    console.log("Finish route");
    const body = await request.json();
    const content = body.messages.splice(5);

    const fileContent = content
      .map(
        (message, index) =>
          `Message ${index + 1}:\n${JSON.stringify(message, null, 2)}`
      )
      .join("\n\n");

    const fileName = `file-${Date.now()}.txt`;

    const message = {
      to: "pharm.saq@gmail.com",
      from: "pharm.saq@gmail.com",
      subject: `New Feedback Submission File: ${fileName}`,
      text: `Please find the attached file: ${fileName}`,
      attachments: [
        {
          content: Buffer.from(fileContent).toString("base64"), // File content encoded in Base64
          filename: fileName,
          type: "text/plain", // MIME type for a plain text file
          disposition: "attachment",
        },
      ],
    };

    await sendgrid
      .send(message)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.error(error.message);
  }
}
