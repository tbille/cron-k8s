import Link from "next/link";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "../state/user";

import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Layout,
  Typography,
  notification,
} from "antd";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const setUser = useSetRecoilState(userState);

  const onFinish = async (values: any) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.status === 200) {
      setUser(data);
      router.push("/login");
    } else {
      console.log(data);
      api.error({
        message: "Error",
        description:
          data.message ?? "Something went wrong, please try again later.",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    if (errorInfo?.message) {
      api.error({
        message: `Login failed`,
        description: errorInfo?.message ? `${errorInfo.message}` : "",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <Content style={{ padding: "5rem 5rem", height: "100%" }}>
          <div style={{ backgroundColor: "white", padding: "0 0 1rem" }}>
            <Row>
              <Col span={6} offset={8}>
                <Title level={2}>Register</Title>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    tooltip="What should we call you?"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Confirm email"
                    name="email_confirm"
                    rules={[
                      { required: true, message: "Please confirm your email!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("email") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two email addresses that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm password"
                    name="password_confirm"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>{" "}
                    <Link href="/login">or login</Link>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
