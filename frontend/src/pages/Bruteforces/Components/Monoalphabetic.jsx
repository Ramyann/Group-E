import { useState } from "react";
import { Form, Input, Button, List, Spin, message } from "antd";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Monoalphabetic = () => {
  const user = useSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { ciphertext, limit, charsetLength } = data;
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/bruteforces/monoalphabetic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ ciphertext, limit, charsetLength }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const resultData = await response.json();
      setResults(resultData.plaintexts);
    } catch (error) {
      message.error("Error during brute-force attack: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h2>Monoalphabetic Cipher Brute Force Attack</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input
          {...register("ciphertext", { required: true })}
          placeholder="Enter encrypted text"
          className="border rounded-lg p-2"
        />

        <input
          type="number"
          {...register("limit", { valueAsNumber: true, min: 1 })}
          defaultValue={10}
          className="border rounded-lg p-2"
        />

        <input
          type="number"
          {...register("charsetLength", {
            valueAsNumber: true,
            min: 1,
            max: 26,
          })}
          defaultValue={6}
          className="border rounded-lg p-2"
        />

        <button
          className="p-4 bg-blue-500 rounded-lg text-white"
          type="primary"
          disabled={loading}
        >
          {loading ? <Spin /> : "Decrypt"}
        </button>
      </form>

      {results.length > 0 && (
        <div className=" bg-white h-44 overflow-y-auto">
          <List
            bordered
            dataSource={results}
            renderItem={(plaintext, index) => (
              <List.Item>
                <strong>Decrypted Text {index + 1}:</strong> {plaintext}
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Monoalphabetic;
