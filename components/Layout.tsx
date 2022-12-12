import type { ReactNode } from "react";
import { Layout as ALayout } from "antd";

const { Content } = ALayout;

import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ALayout>
      <Header />
      <Content style={{ padding: "2rem 5rem" }}>
        <div style={{ backgroundColor: "#fff", padding: "1rem" }}>
          {children}
        </div>
      </Content>
    </ALayout>
  );
};

export default Layout;
