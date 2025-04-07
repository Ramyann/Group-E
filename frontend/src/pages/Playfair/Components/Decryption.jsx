import { useForm } from "react-hook-form";
import { Button, Card } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Decrypt() {
  const user = useSelector((state) => state.user.user);

  const { register, handleSubmit } = useForm();
  const [plaintext, setPlaintext] = useState("");

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/api/playfair/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setPlaintext(result.plaintext);
  };

  return (
    <Card title="Playfair Cipher - Decrypt" className="w-full mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input
          size="large"
          placeholder="Enter ciphertext"
          {...register("ciphertext")}
          className="border rounded-lg p-2"
        />
        <input
          size="large"
          placeholder="Enter key"
          {...register("key")}
          className="border rounded-lg p-2"
        />
        <Button type="primary" htmlType="submit">
          Decrypt
        </Button>
      </form>
      {plaintext && (
        <div className="mt-4 p-2 bg-gray-100 rounded shadow">
          <strong>Plaintext:</strong> {plaintext}
        </div>
      )}
    </Card>
  );
}
