import { useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  Typography,
  Space,
  Card,
  Row,
  Button,
  Spin,
  message,
} from "antd";

const { Text, Paragraph } = Typography;
const { Option } = Select;

const Encryption = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      inputText: "",
      mappings: {},
    },
  });

  const [encryptedText, setEncryptedText] = useState("");
  const watchedInputText = watch("inputText", "");
  // const watchedMappings = watch("mappings", {});

  const alphabet = useMemo(() => "abcdefghijklmnopqrstuvwxyz".split(""), []);

  const uniqueLetters = useMemo(() => {
    const lettersOnly = watchedInputText.toLowerCase().match(/[a-z]/g);
    if (!lettersOnly) return [];

    const unique = [...new Set(lettersOnly)];
    return unique.sort();
  }, [watchedInputText]);

  const handleFormSubmit = async (data) => {
    setEncryptedText("");

    const payload = {
      plainText: data.inputText,
      keys: data.mappings,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/monoalphabetic/encrypt",
        {
          body: JSON.stringify(payload),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resultData = await response.json();

      if (resultData && typeof resultData.ciphertext !== "undefined") {
        setEncryptedText(resultData.ciphertext);
        message.success("Text encrypted successfully!");
      } else {
        throw new Error("Invalid response structure from server.");
      }
    } catch (err) {
      console.error("Encryption failed:", err);
      const errorMsg = err.message || "An unknown error occurred.";
      message.error(`Encryption failed: ${errorMsg}`);
    }
  };

  useEffect(() => {
    if (watchedInputText === "") {
      setEncryptedText("");
      setValue("mappings", {}, { shouldValidate: false, shouldDirty: false });
    } else {
      setEncryptedText("");
    }
  }, [watchedInputText, setValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", overflow: "hidden auto", height: "50vh" }}
      >
        <Card
          title="1. Enter Plain Text & Define Key"
          style={{ maxWidth: 900, margin: "auto" }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <input
              {...register("inputText")}
              type="text"
              id=""
              className="w-full border rounded-lg"
              placeholder="Enter text here..."
            />

            {uniqueLetters.length > 0 && (
              <div>
                <Text strong>Generate Your Key (Map letters):</Text>
                <div
                  style={{
                    marginTop: "10px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    paddingRight: "10px",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    {uniqueLetters.map((letter) => (
                      <div key={letter}>
                        <div className="flex items-center gap-x-1">
                          <Text code style={{ fontSize: "22px" }}>
                            {letter}
                          </Text>
                          <Controller
                            name={`mappings.${letter}`}
                            control={control}
                            render={({ field }) => {
                              return (
                                <Select
                                  {...field}
                                  showSearch
                                  allowClear
                                  placeholder="Map"
                                  style={{ width: 80, height: 30 }}
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    option.children
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  disabled={isSubmitting}
                                  onChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  onClear={() => {
                                    field.onChange(undefined);
                                  }}
                                >
                                  {alphabet.map((alphaLetter) => (
                                    <Option
                                      key={alphaLetter}
                                      value={alphaLetter}
                                    >
                                      {alphaLetter}
                                    </Option>
                                  ))}
                                </Select>
                              );
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </Row>
                </div>
              </div>
            )}

            <Button
              {...register("button")}
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              // disabled={!isMappingComplete || watchedInputText.trim() === ""}
              style={{ marginTop: "15px" }}
            >
              Encrypt Text
            </Button>
          </Space>
        </Card>

        {(isSubmitting || encryptedText) && (
          <Card title="2. Result" style={{ maxWidth: 900, margin: "auto" }}>
            <Spin spinning={isSubmitting} tip="Encrypting...">
              {encryptedText && (
                <div>
                  <Text strong>Encrypted Text:</Text>
                  <Paragraph
                    copyable={{ tooltips: ["Copy", "Copied!"] }}
                    style={{
                      marginTop: "5px",
                      background: "#f5f5f5",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    {encryptedText}
                  </Paragraph>
                </div>
              )}
            </Spin>
          </Card>
        )}
      </Space>
    </form>
  );
};

export default Encryption;
