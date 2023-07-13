import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
	useEffect(() => {
		require("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);
	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}
