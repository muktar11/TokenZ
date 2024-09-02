import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, List, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [youtubeData, setYouTubeData] = useState([]);
  const [coin, setCoins] = useState([]);
  const [customers, setCustomers] = useState(0);
  const [exchange, setExchange] = useState([])
  useEffect(() => {
    fetchYouTubeData();
    fetchCustomers();
    fetchCoinRate();
    fetchExchangeRate();
  }, []);

  const fetchYouTubeData = async () => {
    try {
      const response = await fetch('https://token-z.com/api/youtube/get');
      const data = await response.json();
      
      // Set the retrieved YouTube data to the state
      setYouTubeData(data);
    } catch (error) {
      console.error("Failed to fetch YouTube data:", error);
    }
  };


   const fetchCustomers = async () => {
    try {
      const response = await fetch('https://token-z.com/api/users/get-users');
      const data = await response.json();
      // Set the retrieved YouTube data to the state
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch YouTube data:", error);
    }
  };


    const fetchCoinRate = async () => {
      try {
        const response = await fetch('https://token-z.com/api/coin/get/coin');
        const data = await response.json();
        setCoins(data); // Assuming `data` has a `coins` property that is an array
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };


    const fetchExchangeRate = async () => {
  try {
    const response = await fetch('https://token-z.com/api/exchange/get/exchange');
    const data = await response.json();
    setExchange(data); // Assuming `data` has a `coins` property that is an array
  } catch (error) {
    console.error("Failed to fetch coin data:", error);
  }
};



  return (
<Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"YouTube"}
          value={youtubeData.length} // Number of URLs
        >
          <List
            bordered
            dataSource={youtubeData}
            renderItem={item => (
              <List.Item>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </List.Item>
            )}
          />
        </DashboardCard>

       

       <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Number of active Users"}
          value={customers.length} // Number of URLs
        >
         
        </DashboardCard>

        
        <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Coin Rate"}
       
      >

         <List
            bordered
            dataSource={coin}
            renderItem={item => (
              <List.Item>
      
          {item.value} $
        
      </List.Item>
            )}
          />
       
      </DashboardCard>


       <DashboardCard
  icon={
    <DollarCircleOutlined
      style={{
        color: "red",
        backgroundColor: "rgba(255,0,0,0.25)",
        borderRadius: 20,
        fontSize: 24,
        padding: 8,
      }}
    />
  }
  title={"Exchange Rate"}
>
  <List
    bordered
    dataSource={exchange} // assuming `exchange` is an array of objects like the provided JSON
    renderItem={(item) => (
      <List.Item>
        <div>
          <strong>Currency Type:</strong> {item.currencytype}
        </div>
        <div>
          <strong>Value:</strong> {item.value}
        </div>
        <div>
          <strong>Expiry Date:</strong> {new Date(item.expiry_date).toLocaleDateString()}
        </div>
      </List.Item>
    )}
  />
</DashboardCard>

      </Space>
      <Space>
        {/*
        <RecentOrders /> 
        <DashboardChart />
        */}
      </Space>
    </Space>
  );
}

function DashboardCard({ icon, title, value, children }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <div style={{ marginLeft: 16 }}>
          <div>{title}</div>
          <div>{value}</div>
        </div>
      </div>
      {children && <div style={{ marginTop: 16 }}>{children}</div>}
    </Card>
  );
}

/*
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}
  */
export default Dashboard;
