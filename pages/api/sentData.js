import { google } from "googleapis";

async function sentDataCell(req, res) {
  if (req.method === "POST") {
    const { namaHadir, instansi, ucapan } = req.body;
    console.log(namaHadir, instansi, ucapan);

    try {
      const target = ["https://www.googleapis.com/auth/spreadsheets"];
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        null,
        (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        target
      );

      let timeStamp = new Date();

      const sheets = google.sheets({ version: "v4", auth: jwt });
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: process.env.SPREADSHEET_NAME,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [null, namaHadir, instansi, "Y", timeStamp.toLocaleString()],
          ],
        },
      });

      res.status(201).json({ message: "It works!", response });
      if (res.status >= 200) {
        console.log("Data Sent");
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  }
}

export default sentDataCell;
