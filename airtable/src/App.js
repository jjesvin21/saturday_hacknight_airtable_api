import "./App.css";
import "./loading.css";
import axios from "axios";
import { useRef, useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [desc, setDesc] = useState("");
  const noteref = useRef();
  const descref = useRef();
  const loadRef = useRef();

  const startloading = () => {
    loadRef.current.style.visibility = "visible";
    loadRef.current.style.opacity = 1;
  };

  const endloading = () => {
    loadRef.current.style.opacity = 0;
    loadRef.current.style.visibility = "hidden";
  };

  const handleChange = () => {
    setNote(noteref.current.value);
    setDesc(descref.current.value);
  };

  const url = process.env.REACT_APP_API_URL;
  const key = process.env.REACT_APP_TOKEN;

  const datetime = new Date().toISOString();

  const body = {
    records: [
      {
        fields: {
          Note: note,
          Date: datetime,
          Description: desc,
        },
      },
    ],
  };

  const post = async () => {
    startloading();
    console.log(noteref, descref);

    const res = await axios.post(url, body, {
      headers: {
        Authorization: key,
      },
    });

    console.log(res);
    endloading();
  };

  return (
    <div className="App w-min m-auto">
      {/* ===================== */}
      <div className="loading" ref={loadRef}>
        <div class="multi-spinner-container">
          <div class="multi-spinner">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ==================== */}

      <div className="h-auto m-4 flex flex-col w-min m-auto items-center justify-center">
        <input
          ref={noteref}
          onChange={handleChange}
          className="text-2xl mt-4 px-4 py-2 box-border w-80 font-bold border-2 border-black rounded-xl"
          type="text"
          placeholder="Title"
        />
        <textarea
          style={{ height: "150px" }}
          ref={descref}
          onChange={handleChange}
          className="text-2xl mt-4 px-4 w-80 py-2 box-border border-2 resize-none rounded-xl border-black"
          placeholder="Description"
        />
        <div className="flex justify-between items-center">
          <button
            className="p-5 m-4 bg-blue-600 text-gray-100 rounded-xl"
            onClick={post}
          >
            Add
          </button>
          <a
            href="https://airtable.com/shrhtVhTEPdLNahQB/tblq2cTIl5yEQAJZu"
            target={"_blank"}
          >
            <button className="p-5 m-4 bg-blue-600 text-gray-100 rounded-xl">
              View Notes
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
