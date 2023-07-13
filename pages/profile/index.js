import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Layout from "../../components/layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Profile() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<Layout>
			{user && (
				<div>
					<img src={user.picture} alt={user.name} />
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<Link href="/api/auth/logout">Logout</Link>
				</div>
			)}
		</Layout>
	);
});
