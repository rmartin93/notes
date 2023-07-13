import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Notes() {
	const router = useRouter();
	const { id } = router.query;
	if (id) {
		console.log("id", id);
	}
	const [note, setNote] = useState(null);
	const [updatePending, setUpdatePending] = useState(false);
	const [deletePending, setDeletePending] = useState(false);
	const formRef = useRef(null);
	const updateNote = async () => {
		console.log("updateNote");
		setUpdatePending(true);
		const inputs = formRef.current.querySelectorAll("input, textarea");
		const dataObj = {};
		inputs.forEach((input) => {
			dataObj[input.name] = input.value;
		});
		dataObj.id = id;
		try {
			const resp = await fetch(
				process.env.NEXT_PUBLIC_API_URL + "api/updateNote",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataObj),
				}
			);
			const data = await resp.json();
			console.log("data", data);
		} catch (e) {
			console.error(e);
		}
		setUpdatePending(false);
	};
	const getNote = async () => {
		const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "api/getNote", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id }),
		});
		const returnData = await resp.json();
		console.log("resp", returnData);
		setNote(returnData);
	};
	const deleteNote = async () => {
		setDeletePending(true);
		try {
			const resp = await fetch(
				process.env.NEXT_PUBLIC_API_URL + "api/deleteNote",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: id }),
				}
			);
			const data = await resp.json();
			document.getElementById("closeConfirmBtn").click();
			console.log("data", data);
			router.push("/");
		} catch (e) {
			console.error(e);
		}
		setDeletePending(false);
	};
	useEffect(() => {
		if (id) {
			getNote();
		}
	}, [id]);
	return (
		<Layout>
			<Head>{note && <title>{note.title}</title>}</Head>
			<div className="notes-home mt-4">
				<section className="notes-detail">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="card shadow">
									<div className="card-header d-flex justify-content-between align-items-center">
										<h5 className="card-title mb-0">Note</h5>
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
										{!note && (
											<div className="d-flex justify-content-center">
												<div
													className="spinner-border spinner-border-sm"
													role="status"
													aria-hidden="true"
												></div>
											</div>
										)}
										{note && (
											<>
												<form ref={formRef}>
													<div className="form-group mb-3">
														<label htmlFor="title">Title</label>
														<input
															type="text"
															className="form-control mt-2"
															name="title"
															placeholder="Enter title"
															defaultValue={note.title}
														/>
													</div>
													<div className="form-group mb-3">
														<label htmlFor="description">Body</label>
														<textarea
															className="form-control mt-2"
															name="body"
															rows="3"
															defaultValue={note.body}
														></textarea>
													</div>
												</form>
												<div className="d-flex justify-content-between">
													<div className="d-flex">
														<button
															type="button"
															className="btn btn-primary me-3 d-flex align-items-center"
															onClick={() => updateNote()}
															disabled={updatePending}
														>
															{updatePending && (
																<span
																	className="spinner-border spinner-border-sm me-2"
																	role="status"
																	aria-hidden="true"
																></span>
															)}
															<div>Save Changes</div>
														</button>
														<Link href="/" className="btn btn-secondary">
															Back to Home
														</Link>
													</div>
													<div>
														<button
															className="btn btn-danger"
															data-bs-toggle="modal"
															data-bs-target="#confirmModal"
														>
															Delete
														</button>
													</div>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Confirm Modal */}
				<div
					className="modal fade"
					id="confirmModal"
					tabIndex="-1"
					aria-labelledby="confirmModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-body">
								Are you sure you want to delete this note?
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
									id="closeConfirmBtn"
								>
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-danger d-flex align-items-center"
									onClick={() => deleteNote()}
									disabled={deletePending}
								>
									{deletePending && (
										<span
											className="spinner-border spinner-border-sm me-2"
											role="status"
											aria-hidden="true"
										></span>
									)}
									<div>Delete</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
