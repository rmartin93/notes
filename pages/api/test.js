import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db("test-db");

		const notes = await db.collection("test-collection").find({}).toArray();

		res.json(notes);
	} catch (e) {
		console.error(e);
	}
};
