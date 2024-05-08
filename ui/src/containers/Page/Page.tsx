import { ReactNode } from "react";
import { Footer, Navbar, Sidebar } from "..";

import "./Page.scss";

export interface PageProps {
	id: string;
	className?: string;
	children: ReactNode;
}

export default function Page({ id, className, children }: PageProps) {
	return (
		<div id={id} className={className}>
			<Navbar />
			<Sidebar />
			<div className="page-content">{children}</div>
			<Footer />
		</div>
	);
}
