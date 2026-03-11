"use client";

import { supabase } from "@/lib/supabase";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState, use } from "react";

type Snippet = {
  title: string;
  language: string;
  code: string;
};

export default function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [snippet, setSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    fetchSnippet();
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [snippet]);

  const fetchSnippet = async () => {
    // Get share record
    const { data: share, error: shareError } = await supabase
      .from("snippet_shares")
      .select("snippet_id")
      .eq("id", id)
      .single();

    if (shareError || !share) {
      console.log("Share not found");
      return;
    }

    // Fetch actual snippet
    const { data, error } = await supabase
      .from("snippets")
      .select("title, language, code")
      .eq("id", share.snippet_id)
      .single();

    if (error || !data) {
      console.log("Snippet not found");
      return;
    }

    setSnippet(data);
  };

  const copyCode = () => {
    if (snippet) {
      navigator.clipboard.writeText(snippet.code);
      alert("Code copied!");
    }
  };

  if (!snippet) {
    return <div className="p-10 text-white">Snippet not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl w-full p-10">

        <p className="text-sm text-gray-500 mb-4">
          Shared via SnippetVault
        </p>

        <h1 className="text-3xl font-bold">{snippet.title}</h1>

        <p className="text-gray-400 mt-2">{snippet.language}</p>

        <div className="mt-6 relative">
          <button
            onClick={copyCode}
            className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600"
          >
            Copy
          </button>

          <pre className="bg-[#0d1117] p-4 rounded overflow-x-auto">
            <code className={`language-${snippet.language}`}>
              {snippet.code}
            </code>
          </pre>
        </div>

      </div>
    </div>
  );
}