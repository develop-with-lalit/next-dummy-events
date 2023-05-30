import fs from "fs";
import path from "path";

const saveTo = path.join(process.cwd(), "data", "emails");

export function readFeedbackFromFile() {
  let fileDataString = fs.readFileSync(saveTo).toString();
  fileDataString = "[" + fileDataString.slice(0, -2) + "]";
  return JSON.parse(fileDataString);
}

export default async function RouteHandlerManager(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || email.indexOf("@") === -1) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    fs.appendFileSync(saveTo, email + ",\n");
    res.status(201).json({
      message: "Success",
      email,
    });
  } else {
    res.status(404);
  }
}
