import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import toast from "react-hot-toast"
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``);
  const [loading,setLoading]=useState("");

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setReview("");
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      if(response.status!==200){
        throw new Error(error)
      }
      setLoading(false)
      setReview(response.data)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
      toast.error("Unable to load result")
    }
 
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color:"white"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review-button">Review</div>
        </div>
        <div className="right">
          {loading ?
          <Loader size={10} distance={10}color="white"/>
        :
         ( <Markdown
            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>)
}
        </div>
      </main>
    </>
  )
}



export default App