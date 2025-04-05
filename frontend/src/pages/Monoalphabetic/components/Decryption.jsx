import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Typography, Space, Card, Button, Spin, message } from "antd";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const formatKeysForDisplay = (keys) => {
  if (!keys || typeof keys !== "object" || Object.keys(keys).length === 0) {
    return <Text type="secondary">Keys not available or not recovered.</Text>;
  }

  const sortedEntries = Object.entries(keys).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  return (
    <Paragraph style={{ fontFamily: "monospace", lineHeight: "1.8" }}>
      {sortedEntries.map(([cipherLetter, plainLetter]) => (
        <span
          key={cipherLetter}
          style={{
            padding: "8px",
            marginRight: "15px",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          <Text code style={{ fontSize: "20px" }}>
            {cipherLetter.toUpperCase()}
          </Text>
          {" \u2192 "} {/* Unicode Right Arrow */}
          <Text
            code
            style={{ color: "#1890ff", fontWeight: "bolder", fontSize: "20px" }}
          >
            {plainLetter.toLowerCase()}
          </Text>
        </span>
      ))}
    </Paragraph>
  );
};

const Decryption = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ciphertext: "",
    },
  });

  const [decryptedText, setDecryptedText] = useState("");
  const [recoveredKeys, setRecoveredKeys] = useState(null);

  const watchedCiphertext = watch("ciphertext", "");

  const handleFormSubmit = async (data) => {
    setDecryptedText("");
    setRecoveredKeys(null);

    const payload = {
      ciphertext: data.ciphertext,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/monoalphabetic/decrypt",
        {
          body: JSON.stringify(payload),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resultData = await response.json();

      console.log(resultData)

      setDecryptedText(resultData.plainText);
      setRecoveredKeys(resultData.key || null);
      message.success("Text decrypted successfully!");
    } catch (err) {
      console.error("Decryption failed:", err);
      message.error(`Decryption failed: ${err.message}`);
      setDecryptedText("");
      setRecoveredKeys(null);
    }
  };

  useEffect(() => {
    if (watchedCiphertext === "") {
      setDecryptedText("");
      setRecoveredKeys(null);
    }
  }, [watchedCiphertext]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", overflow: "hidden auto", height: "50vh" }}
      >
        <Card
          title="1. Enter Ciphertext"
          style={{ maxWidth: 900, margin: "auto" }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Controller
              name="ciphertext"
              control={control}
              rules={{ required: "Ciphertext input cannot be empty." }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={6}
                  placeholder="Enter or paste the ciphertext you want to decrypt..."
                  style={{ fontSize: "16px", lineHeight: "1.5" }}
                />
              )}
            />
            {errors.ciphertext && (
              <Text type="danger">{errors.ciphertext.message}</Text>
            )}

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting || !watchedCiphertext.trim()}
              style={{ marginTop: "15px" }}
            >
              Decrypt Text
            </Button>
          </Space>
        </Card>

        {(isSubmitting ||
          decryptedText ||
          recoveredKeys) && (
          <Card
            title="2. Decryption Result"
            style={{ maxWidth: 900, margin: "auto" }}
          >
            <Spin spinning={isSubmitting} tip="Decrypting...">
              {!isSubmitting && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Detected Language: </Text>
                  </div>

                  <div>
                    <Text strong>Recovered Keys (Cipher - Plain):</Text>
                    {formatKeysForDisplay(recoveredKeys)}
                  </div>

                  <div>
                    <Text strong>Decrypted Plaintext:</Text>
                    <Paragraph
                      copyable={{ tooltips: ["Copy", "Copied!"] }}
                      style={{
                        marginTop: "5px",
                        background: "#f5f5f5",
                        padding: "10px",
                        borderRadius: "4px",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        minHeight: "50px",
                      }}
                    >
                      {decryptedText || (
                        <Text type="secondary">No plaintext generated.</Text>
                      )}
                    </Paragraph>
                  </div>
                </Space>
              )}
            </Spin>
          </Card>
        )}
      </Space>
    </form>
  );
};

export default Decryption;
