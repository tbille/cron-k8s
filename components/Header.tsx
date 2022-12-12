import Link from "next/link";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { userState } from "../state/user";

import { Layout, Dropdown, Space, Avatar, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

import type { MenuProps } from "antd";

const { Header: AHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const user = useRecoilValue(userState);

  const items: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      label: <Link href="/logout">Logout</Link>,
      key: "3",
    },
  ];

  return (
    <AHeader style={{ backgroundColor: "#fff" }}>
      <Row>
        <Col span={18}>
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={50}
            style={{ marginTop: ".5rem" }}
          />
        </Col>
        <Col span={6}>
          {user?.email && (
            <div style={{ float: "right" }}>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Text>{user.name}</Text>
                    <Avatar shape="square" icon={<UserOutlined />} />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
        </Col>
      </Row>
    </AHeader>
  );
};

export default Header;
