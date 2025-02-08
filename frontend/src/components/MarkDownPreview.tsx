'use client'
import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function MarkDownPreview({ content }: { content: string }) {
  return (
    <div data-color-mode="light">
      <MarkdownPreview source={content} />
    </div>
  );
}
