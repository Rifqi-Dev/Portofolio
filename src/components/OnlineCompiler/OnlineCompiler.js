import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Output from "./components/Output";
export default function OnlineCompiler() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const editorValueChange = (value) => {
    setCode(value);
  };

  return (
    <div className="relative  md:p-10 p-4 flex gap-3 md:flex-row flex-col">
      <div className=" md:basis-3/4">
        <Editor code={code} onChange={editorValueChange} language={language} />
      </div>
      <div className="md:grow md:basis-auto">
        <Output code={code} language={language} />
      </div>
    </div>
  );
}
