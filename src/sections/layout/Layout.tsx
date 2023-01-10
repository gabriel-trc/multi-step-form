import { Outlet } from "react-router-dom";

import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
	return (
		<>
			<header>
				<h1>MARCA PAIS URUGUAY</h1>
			</header>
			<main>
				<ErrorBoundary>
					<Outlet />
				</ErrorBoundary>
			</main>
		</>
	);
}
