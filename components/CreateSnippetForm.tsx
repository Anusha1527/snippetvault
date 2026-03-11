"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateSnippetForm() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");

  const handleCreate = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("snippets")
      .insert({
        title,
        language,
        code,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const snippetId = data.id;

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    for (const tagName of tagList) {
      let { data: existingTag } = await supabase
        .from("tags")
        .select("*")
        .eq("name", tagName)
        .maybeSingle();

      if (!existingTag) {
        const { data: newTag } = await supabase
          .from("tags")
          .insert({ name: tagName })
          .select()
          .single();

        existingTag = newTag;
      }

      await supabase.from("snippet_tags").insert({
        snippet_id: snippetId,
        tag_id: existingTag.id,
      });
    }

    alert("Snippet created!");

    setTitle("");
    setLanguage("");
    setCode("");
    setTags("");
  };

  return (
    <div className="mt-6 border p-4 rounded">
      <h2 className="text-xl font-bold mb-3">Create Snippet</h2>

      <input
        placeholder="Title"
        value={title || ""}
        className="border p-2 w-full mb-2"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Language"
        value={language || ""}
        className="border p-2 w-full mb-2"
        onChange={(e) => setLanguage(e.target.value)}
      />

      <input
        placeholder="Tags (comma separated)"
        value={tags || ""}
        className="border p-2 w-full mb-2"
        onChange={(e) => setTags(e.target.value)}
      />

      <textarea
        placeholder="Paste your code here"
        value={code || ""}
        className="border p-2 w-full mb-2"
        rows={6}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Snippet
      </button>
    </div>
  );
}