import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db("test-db");
		const returnData = await db
			.collection("notes")
			.deleteOne({ _id: new ObjectId(req.body.id) });

		res.status(200).json(returnData);
	} catch (e) {
		res.status(500).json({ message: "Unable to delete note", error: e });
	}
};
