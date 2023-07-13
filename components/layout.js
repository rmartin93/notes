import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import NavBar from "./navbar";

export const siteTitle = "Notes";

export default function Layout({ children, home }) {
	const { user, isLoading } = useUser();
	if (!isLoading && !user) {
		console.log("Not logged in");
	}
	return (
		<div className="main-wrapper">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<NavBar />
			<main>{children}</main>
		</div>
	);
}
