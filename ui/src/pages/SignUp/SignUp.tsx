import { useState } from "react";
import { AxiosResponse } from "axios";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";
import { AuthAPIService } from "../../api/services";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import { FacebookFilled, GoogleSquareFilled, InstagramOutlined, MailOutlined } from "@ant-design/icons";

import "./SignUp.scss";

export type SignUpFormData = {
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
	password: string;
};

export function SignUp() {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState("");
	const [messageApi, contextHolder] = message.useMessage();

	const navigate = useNavigate();

	const onFinish = async (data: SignUpFormData) => {
		setLoading(true);

		let response: AxiosResponse = await AuthAPIService.signup(
			data.firstName,
			data.lastName,
			data.displayName,
			data.email,
			data.password
		);

		if (response.status === 200) {
			setLoading(false);
			navigate("/login");
		} else {
			setLoading(false);
			setResponse(`${response.status}: ${response.data.message}`);
		}
	};

	const onOAuthClick = () => {
		messageApi.warning("Not yet implemented!");
	};

	return (
		<div id="signup">
			<div id="signup-left">
				<div className="overlay"></div>
				<div className="img-container"></div>
			</div>
			<div id="signup-right">
				<div className="signup-card">
					<div className="signup-card-header">
						<h1>Sign up</h1>
						<p>
							Already have account?
							<Link disabled={loading} strong color="#fff" href="/login" className="signup-card-link">
								Log in
							</Link>
						</p>
					</div>

					<div className="signup-form-oauth-buttons">
						<Button className="signup-form-oauth-button" size="large" disabled={loading} onClick={onOAuthClick}>
							<GoogleSquareFilled />
						</Button>
						<Button className="signup-form-oauth-button" size="large" disabled={loading} onClick={onOAuthClick}>
							<FacebookFilled />
						</Button>
						<Button className="signup-form-oauth-button" size="large" disabled={loading} onClick={onOAuthClick}>
							<InstagramOutlined />
						</Button>
					</div>

					<div className="signup-form-or-design">
						<div className="line"></div>
						<div className="or-text">or</div>
						<div className="line"></div>
					</div>
					<Form
						name="signup-form"
						initialValues={{ remember: true }}
						layout="vertical"
						onFinish={onFinish}
						autoComplete="off"
						requiredMark={false}
					>
						<Form.Item
							label="First name"
							name="firstName"
							rules={[
								{ required: true, message: "Please enter your first name!" },
								{ min: 3, message: "First name must be at least 3 characters long!" },
								{ pattern: /^[a-zA-Z0-9]*$/, message: "First name must contain only alphanumeric characters!" },
							]}
						>
							<Input placeholder="John" disabled={loading} />
						</Form.Item>
						<Form.Item
							label="Last name"
							name="lastName"
							rules={[
								{ required: true, message: "Please enter your last name!" },
								{ min: 3, message: "Last name must be at least 3 characters long!" },
								{ pattern: /^[a-zA-Z0-9]*$/, message: "Last name must contain only alphanumeric characters!" },
							]}
						>
							<Input placeholder="Doe" disabled={loading} />
						</Form.Item>
						<Form.Item
							label="Display name"
							name="displayName"
							rules={[
								{ required: true, message: "Please enter your display name!" },
								{ min: 3, message: "Display name must be at least 3 characters long!" },
								{
									pattern: /^[a-zA-Z0-9_-]*$/,
									message: "Display name must contain only alphanumeric characters, underscores, and hyphens!",
								},
							]}
						>
							<Input placeholder="john_doe" disabled={loading} />
						</Form.Item>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: "Please enter your email!" },
								{ type: "email", message: "Please enter a valid email address!" },
							]}
						>
							<Input suffix={<MailOutlined />} placeholder="your-email@example.com" disabled={loading} />
						</Form.Item>
						<Form.Item
							label="Enter your password"
							name="password"
							rules={[
								{ required: true, message: "Please enter your password!" },
								{ min: 6, message: "Password must be at least 6 characters!" },
							]}
						>
							<Input.Password placeholder="•••••••••••••••••••••••" disabled={loading} />
						</Form.Item>
						<Form.Item name="agreeWithTOC" rules={[{ required: true, message: "Please agree with TOC!" }]}>
							<div className="signup-form-additional-options">
								<Checkbox disabled={loading}>Agree with TOC</Checkbox>
							</div>
						</Form.Item>
						<Form.Item>
							<Button block size="large" disabled={loading} htmlType="submit">
								Sign Up
							</Button>
						</Form.Item>
						{response && response.length > 0 && (
							<Form.Item>
								<div className="">
									<Alert message={response} type="error" showIcon />
								</div>
							</Form.Item>
						)}
					</Form>
				</div>
			</div>
			{contextHolder}
		</div>
	);
}
