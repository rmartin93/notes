import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db("test-db");
		const query = { _id: new ObjectId(req.body.id) };
		const note = await db.collection("notes").findOne(query);
		res.status(200).json(note);
	} catch (e) {
		// Return error with 500 status
		res.status(500).json({
			message: "Unable to get note",
			error: e,
		});
	}
};
