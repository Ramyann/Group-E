import { Button, Card, Select } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function Decryption() {
  const user = useSelector((state) => state.user.user);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      ciphertext: "",
      [`cell-0-0`]: "",
      [`cell-0-1`]: "",
      [`cell-1-0`]: "",
      [`cell-1-1`]: "",
    },
  });
  const [plaintext, setPlaintext] = useState("");
  const [error, setError] = useState("");
  const [size, setSize] = useState(2); // Block size

  const handleSizeChange = (val) => {
    setSize(val);
    setPlaintext("");
    setError("");

    setValue("ciphertext", "");
    for (let i = 0; i < val; i++) {
      for (let j = 0; j < val; j++) {
        setValue(`cell-${i}-${j}`, "");
      }
    }
  };

  const onSubmit = async (data) => {
    setError("");

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
        ciphertext: data?.ciphertext,
        keyLetters,
      };

      const response = await fetch("http://localhost:5000/api/hill/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setPlaintext(result.plaintext);
    } catch (err) {
      setError(err.message || "Decryption failed.");
    }
  };

  return (
    <Card
      title="Hill Cipher - Decrypt"
      className="w-full mx-auto overflow-y-auto h-[80%]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input
          placeholder="Enter ciphertext"
          {...register("ciphertext")}
          className="border rounded-lg p-2"
          required
        />

        <div className="flex items-center gap-4 mt-4">
          <label>Select block size (m):</label>
          <Select
            value={size}
            onChange={handleSizeChange}
            options={[
              { value: 2, label: "2 x 2" },
              { value: 3, label: "3 x 3" },
              { value: 4, label: "4 x 4" }, // Not supported yet
            ]}
            style={{ width: 120 }}
          />
        </div>

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
                  {...register(`cell-${i}-${j}`, {
                    required: true,
                    pattern: /^[A-Z]$/i,
                  })}
                  maxLength={1}
                  className="border p-2 text-center uppercase rounded-md"
                  placeholder="A-Z"
                />
              ))
            )}
          </div>
        </div>

        <Button type="primary" htmlType="submit">
          Decrypt
        </Button>
      </form>

      {plaintext && (
        <div className="mt-4 p-2 bg-gray-100 rounded shadow">
          <strong>Plaintext:</strong> {plaintext}
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
