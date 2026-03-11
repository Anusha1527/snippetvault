"use client";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SnippetList() {
  const [snippets, setSnippets] = useState<any[]>([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [snippets]);

  const fetchSnippets = async () => {
    const { data, error } = await supabase
      .from("snippets")
      .select(`
        *,
        snippet_tags(
          tags(name)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setSnippets(data || []);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const deleteSnippet = async (id: string) => {
    const confirmDelete = confirm("Delete this snippet?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("snippets")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchSnippets();
    }
  };

  const shareSnippet = async (snippetId: string) => {
    const { data, error } = await supabase
      .from("snippet_shares")
      .insert({
        snippet_id: snippetId,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const shareUrl = `${window.location.origin}/share/${data.id}`;

    navigator.clipboard.writeText(shareUrl);
    alert("Share link copied!");
  };

  if (snippets.length === 0) {
    return (
      <div className="mt-10 text-gray-400">
        No snippets yet. Create your first snippet!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="border border-gray-700 p-4 rounded-lg bg-[#0f172a] text-white relative shadow-lg"
        >
          <h3 className="text-lg font-bold">{snippet.title}</h3>

          <p className="text-sm text-gray-400 mb-2">
            {snippet.language}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {snippet.snippet_tags?.map((tagObj: any, index: number) => (
              <span
                key={index}
                className="bg-blue-600 text-xs px-2 py-1 rounded"
              >
                #{tagObj.tags.name}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => shareSnippet(snippet.id)}
              className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-500"
            >
              Share
            </button>

            <button
              onClick={() => deleteSnippet(snippet.id)}
              className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-500"
            >
              Delete
            </button>

            <button
              onClick={() => copyCode(snippet.code)}
              className="bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
            >
              Copy
            </button>
          </div>

          {/* Code */}
          <pre className="rounded overflow-x-auto mt-6">
            <code className={`language-${snippet.language}`}>
              {snippet.code.substring(0, 120)}...
            </code>
          </pre>
        </div>
      ))}
    </div>
  );
}