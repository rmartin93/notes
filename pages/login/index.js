import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Login() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;
	if (user) {
		return (
			<Layout>
				<Head>
					<title>{siteTitle}</title>
				</Head>
				<div>
					Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
				</div>
			</Layout>
		);
	}
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section>
				<p>Login</p>
				<a href="/api/auth/login">Log In</a>
			</section>
		</Layout>
	);
}
