import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Link href="/login">Login</Link>
    </Layout>
  );
}
