import {
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
  PlayCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/Dashboard",
          },
          {
            label: "Video Upload",
            key: "/video-upload",
            icon: <PlayCircleOutlined />,
          },
          {
            label: "Coin Rate",
            key: "/coins",
            icon: <DollarOutlined />,
          },
           {
            label: "Exchange",
            key: "/Exchange",
            icon: <ShopOutlined />,
          },
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
