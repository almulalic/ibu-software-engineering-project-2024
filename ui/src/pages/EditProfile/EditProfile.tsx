import { useState } from "react";
import { AxiosResponse } from "axios";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../containers/Page/Page";
import { MailOutlined } from "@ant-design/icons";
import { AuthAPIService } from "../../api/services";
import { Alert, Button, Card, Form, Input } from "antd";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../constants";

import "./EditProfile.scss";
import { edit_sucessfull } from "../../store/authSlice";

export type EditUserFormData = {
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
};

export function EditProfile() {
	const [form] = Form.useForm();
	const [response, setResponse] = useState("");

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const onFinish = async (data: EditUserFormData) => {
		setLoading(true);

		let response: AxiosResponse = await AuthAPIService.edit(
			data.firstName,
			data.lastName,
			data.displayName,
			data.email
		);

		if (response.status === 200) {
			let accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_NAME);
			let refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_NAME);

			if (accessToken && refreshToken) {
				let refreshResponse = await AuthAPIService.refreshToken(accessToken, refreshToken);

				if (refreshResponse.status === 200) {
					console.log(response.data);
					dispatch(
						edit_sucessfull({
							accessToken: refreshResponse.data.accessToken,
							refreshToken: refreshResponse.data.refreshToken,
							user: response.data,
						})
					);
					window.location.reload();
				} else {
					localStorage.clear();
					window.location.reload();
				}

				setLoading(false);
			}
		} else {
			setLoading(false);
			setResponse(`${response.status}: ${response.data.message}`);
		}
	};

	return (
		<Page id="edit-profile">
			<Card title="Edit Profile" className="edit-profile-form-card">
				<Form
					name="edit-profile-form"
					form={form}
					initialValues={userInfo!}
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
						<Input disabled={isLoading} />
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
						<Input disabled={isLoading} />
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
						<Input disabled={isLoading} />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please enter your email!" },
							{ type: "email", message: "Please enter a valid email address!" },
						]}
					>
						<Input suffix={<MailOutlined />} disabled={isLoading} />
					</Form.Item>

					<Form.Item>
						<Button block size="large" disabled={isLoading} htmlType="submit">
							Save
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
			</Card>
		</Page>
	);
}
