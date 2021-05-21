import Airtable from "airtable";

const BASE_ID = "app4c7VtHgyI6cBHB";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_SECRET,
}).base(BASE_ID);

async function fetchData(baseName) {
  return new Promise((res, rej) => {
    base(baseName)
      .select({
        view: "Grid view",
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          rej(err);
          return;
        }
        res(records);
      });
  });
}

export { fetchData };
