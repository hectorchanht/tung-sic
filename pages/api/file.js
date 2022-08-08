import formidable from "formidable";
import fs from "fs";
import parseRawWhatsappRecord from "../../src/utils/parse-whatsapp-record";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync((file?.path || file?.filepath));

  if (file?.mimetype === 'text/plain') {
    const parsedData = await parseRawWhatsappRecord(data);
    fs.writeFileSync(`./public/parsed-record.json`, JSON.stringify(parsedData));
  } else {
    fs.writeFileSync(`./public/${file?.name || file?.originalFilename}`, data);
  }

  await fs.unlinkSync((file?.path || file?.filepath));
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
          ? console.log("GET")
          : res.status(404).send("");
};
