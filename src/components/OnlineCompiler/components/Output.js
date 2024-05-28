import React, { useState } from "react";
import * as Babel from "@babel/standalone";
import { executeCode } from "../../../service/textEditorService";

export default function Output({ code, language }) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const runJavaScript = async (code) => {
    setLoading(true);
    await executeCode(code)
      .then((r) => {
        // console.log(r.data.result);
        setOutput(r.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const runCode = async () => {
    setError(null);
    setOutput(null);
    switch (language) {
      case "javascript":
        await runJavaScript(code);
        break;
      //   case "python":
      //     result = runPython(code);
      //     break;
      //   case "cpp":
      //     result = await runCpp(code);
      //     break;
      default:
        setError("Unsupported language");
    }
  };
  return (
    <div className="flex flex-col h-full max-w-[388px]">
      <button
        onClick={runCode}
        className="w-full px-6 py-2 text-white bg-[#822020] rounded "
      >
        Run
      </button>
      <div className="bg-[#1e1e1e] mt-3 p-2 flex-grow basis-[498px] max-h-[498px] overflow-scroll">
        <h2>Output:</h2>
        {loading ? (
          <pre className="font-mono">Loading...</pre>
        ) : error ? (
          <>
            <pre className="font-mono ">An Error Occurred</pre>
            <pre className="font-mono text-red-600  whitespace-pre-wrap break-words">
              {error}
            </pre>
          </>
        ) : (
          <>
            {output ? (
              <pre className="font-mono whitespace-pre-wrap break-words">
                {output}
              </pre>
            ) : (
              <pre className="font-mono">Click run to see the output</pre>
            )}
          </>
        )}
      </div>
    </div>
  );
}
