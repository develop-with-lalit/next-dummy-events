import fs from "fs";
import path from "path";

const saveTo = path.join(process.cwd(), "data", "comments");

export function readFeedbackFromFile() {
  let fileDataString = fs.readFileSync(saveTo).toString();
  fileDataString = "[" + fileDataString.slice(0, -2) + "]";
  return JSON.parse(fileDataString);
}

export default async function RouteHandlerManager(req, res) {
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const { name, email, text } = req.body;
    // if needed add validation here
    const newCommentString = JSON.stringify({
      id: new Date().toISOString(),
      email,
      text,
      name,
      eventId,
    });

    fs.appendFileSync(saveTo, newCommentString + ",\n");
    res.status(201).json({
      message: "Success",
      newCommentString: JSON.parse(newCommentString),
    });
  } else if (req.method === "GET") {
    const fileData = readFeedbackFromFile();
    res.status(200).json({
      message: "Success",
      allComments: fileData,
    });
  } else {
    res.status(404);
  }
}
