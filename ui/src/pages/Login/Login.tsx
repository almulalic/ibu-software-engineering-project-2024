import { useState } from "react";
import { AxiosResponse } from "axios";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";
import { AuthAPIService } from "../../api/services";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import { login_attempt, login_failed, login_sucessfull } from "../../store/authSlice";
import { FacebookFilled, GoogleSquareFilled, InstagramOutlined, MailOutlined } from "@ant-design/icons";

import "./Login.scss";

export type LoginFormData = {
	email: string;
	password: string;
	rememberMe: boolean;
};

export function Login() {
	const { loading } = useSelector((state: RootState) => state.auth);
	const [loginResponse, setLoginResponse] = useState("");
	const [messageApi, contextHolder] = message.useMessage();

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const onFinish = async (data: LoginFormData) => {
		dispatch(login_attempt());

		let response: AxiosResponse = await AuthAPIService.login(data.email, data.password, data.rememberMe);

		if (response.status === 200) {
			dispatch(login_sucessfull(response.data));
			navigate("/");
		} else {
			dispatch(login_failed());
			setLoginResponse(`${response.status}: ${response.data.message}`);
		}
	};

	const onOAuthClick = () => {
		messageApi.warning("Not yet implemented!");
	};

	return (
		<div id="login">
			<div id="login-left">
				<div className="overlay"></div>
				<div className="img-container"></div>
			</div>
			<div id="login-right">
				<div className="login-card">
					<div className="login-card-header">
						<h1>Log in</h1>
						<p>Sign in to your account</p>
					</div>

					<div className="login-form-oauth-buttons">
						<Button className="login-form-oauth-button" size="large" disabled={loading} onClick={onOAuthClick}>
							<GoogleSquareFilled />
						</Button>
						<Button className="login-form-oauth-button" size="large" disabled={loading} onClick={onOAuthClick}>
							<FacebookFilled />
						</Button>
						<Button className="login-form-oauth-button" size="large" disabled={loading} onClick={onOAuthClick}>
							<InstagramOutlined />
						</Button>
					</div>

					<div className="login-form-or-design">
						<div className="line"></div>
						<div className="or-text">or</div>
						<div className="line"></div>
					</div>

					<Form name="login-form" layout="vertical" onFinish={onFinish} autoComplete="off" requiredMark={false}>
						<Form.Item
							label="Enter your email address"
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
						<Form.Item name="rememberMe" initialValue={true}>
							<div className="login-form-additional-options">
								<Checkbox name="rememberMe" checked disabled={loading}>
									Remember me
								</Checkbox>
								<Link disabled={loading} onClick={onOAuthClick}>
									Forgot your password?
								</Link>
							</div>
						</Form.Item>
						<Form.Item>
							<Button block size="large" disabled={loading} htmlType="submit">
								Log in
							</Button>
						</Form.Item>
						{loginResponse && loginResponse.length > 0 && (
							<Form.Item>
								<div className="">
									<Alert message={loginResponse} type="error" showIcon />
								</div>
							</Form.Item>
						)}
					</Form>

					<div className="login-form-sign-up-message">
						Don't have an account yet?
						<Link disabled={loading} strong color="#fff" href="/signup" className="login-card-link">
							Sign up!
						</Link>
					</div>
				</div>
			</div>
			{contextHolder}
		</div>
	);
}
