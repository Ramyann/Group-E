import { useEffect, useState } from "react";
import { Table, Button, Spin, Tag, Modal, Alert } from "antd";
import { useSelector } from "react-redux";
import { performBruteForceAttack } from "../../../dist/attackerHelper";

function BruteForce() {
  const user = useSelector((state) => state.user.user);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loadingRowKey, setLoadingRowKey] = useState(null);
  const [attackTargetName, setAttackTargetName] = useState("");

  const handleAttack = async (record) => {
    const { email, encryptedPassword, name, key } = record;

    setLoadingRowKey(key);
    setAttackTargetName(name);
    setModalContent("");

    try {
      const result = await performBruteForceAttack(email, encryptedPassword, name);
      setModalContent(result.message || "No response message.");
    } catch (err) {
      setModalContent("Error during attack. Check console for details.");
      console.error("Attack error:", err);
    }

    setIsModalVisible(true);
    setLoadingRowKey(null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Encrypted Password",
      dataIndex: "encryptedPassword",
      key: "encryptedPassword",
      render: (text) =>
        text ? <Tag color="volcano">{text}</Tag> : <Tag>N/A</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleAttack(record)}
          loading={loadingRowKey === record.key}
          disabled={loadingRowKey !== null}
        >
          {loadingRowKey === record.key ? "Attacking..." : "Brute Force"}
        </Button>
      ),
    },
  ];

  const renderContent = () => {
    if (!user?.token) {
      return (
        <Alert
          message="Info"
          description="Please log in to view users."
          type="info"
          showIcon
          className="mb-4"
        />
      );
    }

    if (isLoading) {
      return <Spin tip="Loading users..." size="large" className="block my-4" />;
    }

    if (fetchError) {
      return (
        <Alert
          message="Error"
          description={fetchError}
          type="error"
          showIcon
          className="mb-4"
        />
      );
    }

    if (userList.length === 0) {
      return <p>No user data available.</p>;
    }

    return (
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="key"
        bordered
        pagination={false}
      />
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const res = await fetch("http://localhost:5000/api/user/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        const mapped = Array.isArray(data)
          ? data.map((u) => ({
              ...u,
              key: u._id || u.email || Math.random().toString(36),
            }))
          : [];

        setUserList(mapped);
      } catch (err) {
        setFetchError(err.message || "Unknown error while fetching users.");
      }

      setIsLoading(false);
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="space-y-6 p-4 h-[50vh] overflow-y-auto">
      {renderContent()}

      <Modal
        title={
          <span className="font-semibold">
            {`Attack Result for: ${attackTargetName || "User"}`}
          </span>
        }
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        destroyOnClose
      >
        <p className="text-gray-800 mt-4 p-2 bg-gray-50 rounded whitespace-pre-wrap">
          {modalContent}
        </p>
      </Modal>
    </div>
  );
}

export default BruteForce;
