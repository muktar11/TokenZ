import { Space, Table, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Assuming you have functions to handle edit and delete actions
const handleEdit = (userId) => {
  // Implement your edit logic here
  console.log("Edit user with ID:", userId);
};

const handleDelete = (userId) => {
  // Implement your delete logic here
  console.log("Delete user with ID:", userId);
};

const getCustomers = async () => {
  try {
    const response = await fetch('https://token-z.com/api/users/get-users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return the data array
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // Return an empty array in case of error
  }
};

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCustomers();

        // Check if data is an array and map it correctly
        if (Array.isArray(data)) {
          setDataSource(
            data.map((user) => ({
              key: user.id,
              username: user.username,
              phone: user.phone,
              coins: user.coins,
              role: user.role,
            }))
          );
        } else {
          console.error('Unexpected data format:', data);
          setDataSource([]);
        }
      } catch (error) {
        console.error('Data fetch error:', error);
        setDataSource([]); // Ensure dataSource is set to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures this runs once on mount

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Coins",
      dataIndex: "coins",
      key: "coins",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditIcon />}
            onClick={() => handleEdit(record.key)}
            type="link"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteIcon />}
            onClick={() => handleDelete(record.key)}
            type="link"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Customers;

