import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function NavBar() {
	const { user } = useUser();
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				<Link className="navbar-brand" href="/">
					Notes
				</Link>
				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNav"
				>
					<ul className="navbar-nav align-items-center gap-3">
						<li className="nav-item active"></li>
						{user ? (
							<>
								<li className="nav-item">
									<Link className="nav-link" href="/profile">
										<img
											className="rounded-4"
											src={user.picture}
											style={{ width: "50px" }}
										/>
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/api/auth/logout">
										Logout
									</Link>
								</li>
							</>
						) : (
							<li className="nav-item">
								<Link className="nav-link" href="/api/auth/login">
									Login
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
