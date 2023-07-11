import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import clientPromise from "../lib/mongodb";

export async function getStaticProps() {
	const client = await clientPromise;
	const collection = client.db("test-db").collection("test-collection");
	const result = await collection.find({}).toArray();

	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
			result: JSON.stringify(result),
		},
	};
}

export default function Home({ allPostsData, result }) {
	console.log("result", JSON.parse(result)[0]);
	const name = JSON.parse(result)[0].name;
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<p>{name}</p>
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
