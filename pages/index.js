import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import useSWR from "swr";

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Home({ allPostsData }) {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, error } = useSWR("/api/test", fetcher);
	console.log("data", data);
	if (data) {
		data.map((note) => {
			console.log("note", note._id);
		});
	}

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<ul style={{ border: "2px solid green" }}>
				{!data && "Loading..."}
				{error && "Error loading data."}
				{data &&
					data.map((note) => {
						return <li key={note._id}>{note.name}</li>;
					})}
			</ul>
			<section className={utilStyles.headingMd}>
				<p>[Your Self Introduction]</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
