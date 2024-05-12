import { useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../containers/Page/Page";
import { MailOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input } from "antd";

import "./EditProfile.scss";
import { AxiosResponse } from "axios";
import { AuthAPIService } from "../../api/services";
import { login_failed, login_sucessfull } from "../../store/authSlice";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../constants";

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
					setResponse("Edit successful");
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
						rules={[{ required: true, message: "Please enter your first name!" }]}
					>
						<Input disabled={isLoading} />
					</Form.Item>
					<Form.Item
						label="Last name"
						name="lastName"
						rules={[{ required: true, message: "Please enter your last name!" }]}
					>
						<Input disabled={isLoading} />
					</Form.Item>
					<Form.Item
						label="Display name"
						name="displayName"
						rules={[{ required: true, message: "Please enter your display name!" }]}
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
