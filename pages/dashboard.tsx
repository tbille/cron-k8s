import { Typography, Button, Table, Alert, Progress } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useRecoilValue } from "recoil";
import { userState } from "../state/user";

import Layout from "../components/Layout";

const { Title } = Typography;

const Dashboard = () => {
  const user = useRecoilValue(userState);
  const data = [];

  const columns: ColumnsType = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <Layout>
      <>
        {!user?.verified && (
          <Alert
            message="Please verify your email address"
            description="You will not be able to create or run jobs until you have verified your email. You should find an email in your inbox with a link to verify your email address."
            type="warning"
            showIcon
          />
        )}
        <Title level={2}>
          Usage{" "}
          <small>
            {user.rows_count} / {user.rows_limit}
          </small>
        </Title>
        <Progress percent={(user.rows_count / user.rows_limit) * 100} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={2}>Running jobs</Title>
          <Title level={4}>
            <Button type="primary">Create job</Button>
          </Title>
        </div>
        <Table columns={columns} dataSource={data} />
      </>
    </Layout>
  );
};

export default Dashboard;
