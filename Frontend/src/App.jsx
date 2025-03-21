import axios from "axios";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";
import { useCallback, useEffect, memo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";
import rehypeHighlight from "rehype-highlight";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";

import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-cpp.min.js";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const BASE_URL = import.meta.env.VITE_BAKEND_URL;

  const handleCodechange = useCallback(async () => {
    setReview("");
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/ai/get-review`, { code });
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.data) setReview(response.data);
      else setReview("Unable to load review");
    } catch (error) {
      console.error(error.message);
      toast.error(`Unable to load result: ${error.message}`);
    } finally {
      setLoading(false); // Ensure loading is always set to false
    }
  }, [code]);

  return (
    <>
      {/* <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color: "white",
                overflow: "scroll",
              }}
            />
          </div>
          <div onClick={handleCodechange} className="review-button">
            Review
          </div>
        </div>
        <div className="right">
          {loading ? (
            <Loader size={10} distance={10} color="white" />
          ) : review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            ""
          )}
        </div>
      </main> */}
      <main>
        <div
          className="left"
          style={{ display: "flex", flexDirection: "column", }}
        >

          <div className="code" style={{ flex: 1, overflowY: "auto" }}>
            <Editor
              value={code}
              onValueChange={(val) => setCode(val)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                minHeight:"100%",
                width:"100%",
                color: "white",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
              }}
            />
          </div>
          <div onClick={handleCodechange} className="review-button">
            Review
          </div>
        </div>
        <div className="right">
          {loading ? (
            <Loader size={10} distance={10} color="white" />
          ) : review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  );
}

export default memo(App);
