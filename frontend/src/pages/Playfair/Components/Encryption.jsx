import { Button, Card } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Encryption() {
  const { register, handleSubmit } = useForm();
  const [ciphertext, setCiphertext] = useState("");

  const user = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/api/playfair/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    setCiphertext(result);
  };

  return (
    <Card title="Playfair Cipher - Encrypt" className="w-full mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <input
          placeholder="Enter plaintext"
          {...register("plaintext")}
          className="border rounded-lg p-2"
        />
        <input
          placeholder="Enter key"
          {...register("key")}
          className="border rounded-lg p-2"
        />
        <Button type="primary" htmlType="submit">
          Encrypt
        </Button>
      </form>
      {ciphertext && (
        <div className="mt-4 p-2 bg-gray-100 rounded shadow">
          <strong>Ciphertext:</strong> {ciphertext}
        </div>
      )}
    </Card>
  );
}
