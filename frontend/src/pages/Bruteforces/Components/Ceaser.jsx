import { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { useSelector } from "react-redux";

const Ceaser = () => {
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState(null); // now storing just one result object
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/bruteforces/ceasar",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await res.json();
        setUsers(data?.users || []);

        console.log(data?.users)
      } catch (err) {
        message.error("Failed to fetch users");
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  const handleBruteForce = async (email) => {
    setLoadingUserId(email);
    setResults(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/bruteforces/ceasar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("Failed to brute-force password");

      const resultData = await response.json();

      setResults({
        shift: resultData.shift,
        plaintext: resultData.decrypted,
        encrypted: resultData.encrypted,
      });
      setIsModalOpen(true); // open modal when result is ready
    } catch (error) {
      message.error("Error: " + error.message);
    } finally {
      setLoadingUserId(null);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleBruteForce(record?.email)}
          loading={loadingUserId === record?.email}
        >
          Brute Force
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-6 h-[80%] overflow-y-auto">
      <h2 className="text-xl font-semibold">Ceaser Brute-force attack</h2>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <Modal
        title="Brute Force Result"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
        ]}
        wrapClassName="custom-modal"
      >
        {results && (
          <div className="space-y-2">
            <p>
              <strong>Shift:</strong> {results.shift}
            </p>
            <p>
              <strong>Decrypted:</strong> {results.plaintext}
            </p>
            <p>
              <strong>Encrypted:</strong> {results.encrypted}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Ceaser;
