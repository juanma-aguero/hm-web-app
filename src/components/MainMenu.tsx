import { Menu, MenuProps } from "antd";
import { SolutionOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: <Link href="/">Home</Link>,
  },
  {
    key: "oportunities",
    icon: <SolutionOutlined />,
    label: <Link href="/oportunities">Oportunities</Link>,
  },
];

export default function MainMenu() {
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      items={items}
      style={{ minWidth: 0, flex: "auto" }}
    />
  );
}
