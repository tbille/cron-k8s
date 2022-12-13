import { Typography, Button, Table, Alert, Progress, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";

import useSWR from "swr";

import { useRecoilValue } from "recoil";
import { userState } from "../state/user";

import Layout from "../components/Layout";

const { Title } = Typography;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const Dashboard = () => {
  const user = useRecoilValue(userState);
  const { data, error } = useSWR("/api/jobs", fetcher);

  const columns: ColumnsType = [
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled: boolean) => (
        <Switch checked={enabled} disabled={true} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
      title: "Webook",
      dataIndex: "webhook_url",
      key: "webhook_url",
    },
    {
      title: "Query",
      dataIndex: "sql_query",
      key: "sql_query",
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
        <Table columns={columns} dataSource={data.items} />
      </>
    </Layout>
  );
};

export default Dashboard;
