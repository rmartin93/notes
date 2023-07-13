import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db("test-db");
		const filter = { _id: new ObjectId(req.body.id) };
		const updateDoc = {
			$set: {
				title: req.body.title,
				body: req.body.body,
			},
		};
		const returnData = await db
			.collection("notes")
			.updateOne(filter, updateDoc);

		res.status(200).json(returnData);
	} catch (e) {
		res.status(500).json({ message: "Unable to update note", error: e });
	}
};
