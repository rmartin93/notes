import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import useSWR from "swr";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	// const fetcher = (...args) => fetch(...args).then((res) => res.json());
	// const { data: notes, error } = useSWR("/api/getNotes", fetcher);
	const { user } = useUser();
	const [notes, setNotes] = useState(null);
	const [notesPending, setNotesPending] = useState(false);
	const getNotes = async () => {
		// Get notes from API using {userId: user.sub}
		setNotesPending(true);
		try {
			const resp = await fetch("api/getNotes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: user.sub }),
			});
			const data = await resp.json();
			setNotes(data);
		} catch (e) {
			console.error(e);
		}
		console.log("notes", notes);
		setNotesPending(false);
	};
	useEffect(() => {
		if (user) {
			getNotes();
		}
	}, [user]);
	const [insertPending, setInsertPending] = useState(false);
	const formRef = useRef(null);
	const addNote = async () => {
		console.log("add note");
		setInsertPending(true);
		const inputs = formRef.current.querySelectorAll("input, textarea");
		const dataObj = {};
		inputs.forEach((input) => {
			dataObj[input.name] = input.value;
		});
		dataObj.userId = user.sub;
		try {
			const resp = await fetch("api/addNote", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataObj),
			});
			const data = await resp.json();
			console.log("data", data);
			getNotes();
		} catch (e) {
			console.error(e);
		}
		setInsertPending(false);
		// Close add modal
		const addModalClose = document.getElementById("addModalClose");
		addModalClose.click();
	};
	return (
		<Layout home>
			<Head>
				<title>{siteTitle + " | Home"}</title>
			</Head>
			{user && (
				<div className="notes-home mt-4">
					<section className="notes-list">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<div className="card shadow">
										<div className="card-header d-flex justify-content-between align-items-center">
											<h5 className="card-title mb-0">Notes</h5>
											<div className="note-btns | d-flex align-items-center">
												<button
													type="button"
													className="btn btn-success"
													data-bs-toggle="modal"
													data-bs-target="#addModal"
												>
													Add Note
												</button>
											</div>
										</div>
										<div className="card-body">
											<ul className="list-group">
												{notesPending && (
													<div className="d-flex justify-content-center">
														<div
															className="spinner-border spinner-border-sm"
															role="status"
															aria-hidden="true"
														></div>
													</div>
												)}
												{notes &&
													notes.map((note) => (
														<Link
															key={note._id}
															className="list-group-item"
															href={"notes/" + note._id}
														>
															<h5 className="card-title">{note.title}</h5>
															<p className="card-text">{note.body}</p>
														</Link>
													))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div
						className="modal fade"
						id="addModal"
						tabIndex="-1"
						aria-labelledby="addModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header d-flex justify-content-between">
									<h5 className="modal-title" id="addModalLabel">
										Add Note
									</h5>
									<button
										type="button"
										className="btn-close"
										id="addModalClose"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">
									<form ref={formRef}>
										<div className="form-group mb-3">
											<label htmlFor="title">Title</label>
											<input
												type="text"
												className="form-control mt-2"
												name="title"
												placeholder="Enter title"
											/>
										</div>
										<div className="form-group mb-3">
											<label htmlFor="description">Body</label>
											<textarea
												className="form-control mt-2"
												name="body"
												rows="3"
											></textarea>
										</div>
									</form>
									<button
										type="button"
										className="btn btn-primary me-3 d-flex align-items-center"
										onClick={() => addNote()}
										disabled={insertPending}
									>
										{insertPending && (
											<span
												className="spinner-border spinner-border-sm me-2"
												role="status"
												aria-hidden="true"
											></span>
										)}
										<div>Submit</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
}
