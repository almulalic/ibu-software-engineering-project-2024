import { useEffect } from "react";
import { Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useSearchParams } from "react-router-dom";
import { About, EventSlideshow, Footer, Navbar, Sidebar } from "../../containers";

import "./Landing.scss";

export function Landing() {
	const [searchParams] = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (searchParams.has("messageType") && searchParams.has("message")) {
			const type = searchParams.get("messageType");
			const message = searchParams.get("message");

			switch (type) {
				case "error":
					messageApi.error(message);
					return;
				case "info":
					messageApi.info(message);
					return;
				case "warning":
					messageApi.warning(message);
					return;
				case "success":
					messageApi.success(message);
					return;
			}
		}
	}, []);

	return (
		<Layout id="landing">
			<Navbar />
			<Sidebar />
			<Content id="landing-content">
				<EventSlideshow />
				<About />
			</Content>
			<Footer />
			{contextHolder}
		</Layout>
	);
}
