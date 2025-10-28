import React from "react";
import { InputProps, set } from "sanity";
import { Button, Box, Flex, Card } from "@sanity/ui";
import { motion } from "framer-motion";

export const myCustomFormComponents = {
  input: (props: InputProps) => {
    const { renderDefault, value, onChange, elementProps } = props;

    const handleSave = () => {
      onChange(set(value));
      alert("✅ Saved successfully!");
      elementProps?.ref?.current?.blur?.();
    };

    const handleCancel = () => {
      const confirmClose = confirm(
        "⚠️ Unsaved changes will be lost. Do you want to close without saving?"
      );
      elementProps?.ref?.current?.blur?.();
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box paddingY={3} style={{ fontFamily: "Inter, sans-serif" }}>
          {/* Render Sanity’s default input editor */}
          {renderDefault(props)}

          <Card
            padding={3}
            tone="transparent"
            marginTop={3}
            style={{
              border: "1px solid #e2e2e2",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <Flex justify="flex-end" gap={2} marginTop={2}>
              <Button
                text="Cancel"
                tone="critical"
                style={{
                  backgroundColor: "#f60404ff",
                  borderRadius: "6px",
                  color: "white",
                  padding: "0 12px",
                }}
                onClick={handleCancel}
              />
              <Button
                text="Ok"
                tone="positive"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "6px",
                  padding: "0 12px",
                }}
                onClick={handleSave}
              />
            </Flex>
          </Card>
        </Box>
      </motion.div>
    );
  },
};
