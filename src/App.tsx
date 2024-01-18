import Editor from "./component/Editor";
import Display from "./component/Display";
import { useState, useEffect } from "react";

export interface Values {
  RED?: boolean;
  H1?: boolean;
  UNDELINE?: boolean;
  BOLD?: boolean;
}

function App() {
  const [text, setText] = useState<string | null>("");

  const [currentConditions, setValues] = useState<any>({});

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setText(localStorage.getItem("name"));
    }

    if (localStorage.getItem("Conditions")) {
      setValues(localStorage.getItem("Conditions"));
    }
  }, []);

  return (
    <>
      <div className="App h-[100vh] w-[100vw] flex flex-col items-center bg-gray-300 justify-center p-10">
        <div className="Editor h-[15%] w-full p-[10px]">
          <Editor
            text={text}
            currentConditions={currentConditions}
            onChange={(e: any) => setText(e)}
          />
        </div>
        <div className="Display h-[85%] w-full bg-white">
          <Display
            text={text}
            conditions={currentConditions}
            onChange={(e: any) => setText(e)}
            onValues={(e: any) => setValues(e)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
