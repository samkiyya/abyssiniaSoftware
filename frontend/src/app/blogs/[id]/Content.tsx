"use client";
import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function Content({ content }: { content: string }) {
  return (
    <div>
      <MarkdownPreview
        source={content}
        className="rounded-2xl p-4 text-sm text-red-400 py-6 sm:py-10"
      />
    </div>
  );
}
