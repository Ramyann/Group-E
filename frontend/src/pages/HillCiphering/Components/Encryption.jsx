import { Button, Card, Select } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Encryption() {
  const { register, handleSubmit, setValue } = useForm();
  const [size, setSize] = useState(2);
  const [ciphertext, setCiphertext] = useState("");
  const [error, setError] = useState("");
  const [matrixError, setMatrixError] = useState("");
  const user = useSelector((state) => state.user.user);

  const handleSizeChange = (val) => {
    setSize(val);
    setCiphertext("");
    setError("");
    setMatrixError("");
  };

  const onSubmit = async (data) => {
    setError("");
    setMatrixError("");

    try {
      const keyLetters = [];
      for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
          const cell = data[`cell-${i}-${j}`]?.toUpperCase();
          if (!/^[A-Z]$/.test(cell)) {
            throw new Error("All key cells must be single letters A-Z.");
          }
          row.push(cell);
        }
        keyLetters.push(row);
      }

      const payload = {
        plaintext: data.plaintext,
        keyLetters,
      };

      const response = await fetch("http://localhost:5000/api/hill/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setCiphertext(result.ciphertext);
    } catch (err) {
      setError(err.message || "Encryption failed.");
    }
  };

  return (
    <Card title="Hill Cipher - Encrypt" className="w-full mx-auto overflow-y-auto h-[80%]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input
          placeholder="Enter plaintext"
          {...register("plaintext")}
          className="border rounded-lg p-2"
          required
        />

        <div className="flex items-center gap-4 mt-4">
          <label>Select block size (m):</label>
          <Select
            defaultValue={size}
            onChange={handleSizeChange}
            options={[
              { value: 2, label: "2 x 2" },
              { value: 3, label: "3 x 3" },
              { value: 4, label: "4 x 4" },
            ]}
            style={{ width: 120 }}
          />
        </div>

        {matrixError && (
          <div className="mt-4 p-2 bg-red-100 text-red-600 rounded shadow">
            <strong>Error:</strong> {matrixError}
          </div>
        )}

        <div className="mt-4">
          <strong>Enter Key Matrix:</strong>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {Array.from({ length: size }).map((_, i) =>
              Array.from({ length: size }).map((_, j) => (
                <input
                  key={`${i}-${j}`}
                  {...register(`cell-${i}-${j}`)}
                  maxLength={1}
                  className="border p-2 text-center uppercase rounded-md"
                  placeholder="A-Z"
                  required
                />
              ))
            )}
          </div>
        </div>

        <Button type="primary" htmlType="submit">
          Encrypt
        </Button>
      </form>

      {ciphertext && (
        <div className="mt-4 p-2 bg-gray-100 rounded shadow">
          <strong>Ciphertext:</strong> {ciphertext}
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-600 rounded shadow">
          <strong>Error:</strong> {error}
        </div>
      )}
    </Card>
  );
}
