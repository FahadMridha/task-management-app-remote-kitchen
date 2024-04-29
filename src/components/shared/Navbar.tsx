"use client";

import { Button, Layout, Menu, Typography } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const {Content } = Layout;
const { Title } = Typography;

const items = [
  { key: "1", label: "Home", href: "/" },
  { key: "1", label: "Task", href: "/taskManagement" },
];

const Navbar = ({ session }: { session: any }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Layout className=" shadow-lg">
      <div className="flex items-center  bg-white ">
        <Content>
          <Link href="/">
            <Title className="m-0 text-2xl flex items-center">
              <p className="m-0 ml-2">Task Management</p>
            </Title>
          </Link>
        </Content>
        <Menu
          className="lg:block hidden"
          disabledOverflow
          mode="horizontal"
          selectedKeys={[pathname]}
        >
          {items?.map((item) => (
            <Menu.Item key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}

          {session ? (
            <>
              <Button
                className="ml-4"
                ghost
                size="large"
                type="primary"
                danger
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="ml-4"
              ghost
              size="large"
              type="primary"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          )}
        </Menu>
      </div>
    </Layout>
  );
};

export default Navbar;
