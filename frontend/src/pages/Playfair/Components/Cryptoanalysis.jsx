import { useForm } from "react-hook-form";
import { Input, Button, Card } from "antd";
import { useState } from "react";

export default function Cryptoanalysis() {
  const { register, handleSubmit } = useForm();
  const [plaintext, setPlaintext] = useState("");

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/api/playfair/cryptoanalysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setPlaintext(result.plaintext);
  };

  return (
    <Card title="Playfair Cipher - Cryptoanalysis" className="max-w-xl mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Enter ciphertext" {...register("ciphertext")} className="mb-2" />
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
