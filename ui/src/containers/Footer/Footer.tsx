import { Col, Layout, Row } from "antd";

import "./Footer.scss";
import { FacebookFilled, InstagramFilled, TwitterCircleFilled, YoutubeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function Footer() {
	const navigate = useNavigate();

	return (
		<Layout.Footer id="footer">
			<Row className="footer-wrapper" align="middle" justify="center" gutter={[24, 24]}>
				<Col span={24}>
					<Row className="footer-social-media" gutter={36} align="middle" justify="center">
						<Col>
							<FacebookFilled onClick={() => navigate("/")} />
						</Col>
						<Col>
							<InstagramFilled onClick={() => navigate("/")} />
						</Col>
						<Col>
							<YoutubeFilled onClick={() => navigate("/")} />
						</Col>
						<Col>
							<TwitterCircleFilled onClick={() => navigate("/")} />
						</Col>
					</Row>
				</Col>

				<Col span={24}>
					<Row className="footer-links" gutter={24} align="middle" justify="center">
						<Col xs={12} sm={6}>
							Contact us
						</Col>
						<Col xs={12} sm={6}>
							Our Services
						</Col>
						<Col xs={12} sm={6}>
							Privacy Policy
						</Col>
						<Col xs={12} sm={6}>
							Terms & Conditions
						</Col>
					</Row>
				</Col>

				<Col span={24} className="all-rights-reserved">
					<span>EventPort Copyright © 2023 amulalic - All rights reserved</span>
				</Col>
			</Row>
		</Layout.Footer>
	);
}
