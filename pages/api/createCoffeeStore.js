import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighborhood, address, imgUrl, rating } = req.body;

    try {
      //find a record
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          //create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  rating,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "ID or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "ID is missing" });
      }
    } catch (err) {
      console.error("Error creating or finding a store", err);
      res.status(500);
      res.json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
