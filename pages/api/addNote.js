import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db("test-db");
		const returnData = await db.collection("notes").insertOne(req.body);

		res.json(returnData);
	} catch (e) {
		console.error(e);
	}
};
