import { useEffect, useState } from "react";
import { Values } from "../App";

interface indexes {
  hash: number[];
  star: number[];
}

function Display({
  text,
  onChange,
  onValues,
}: {
  text: any;
  onChange: (e: string) => void;
  onValues: (e: Values) => void;
  conditions: any;
}) {
  //variables to for conditional changes in css properties
  const [h1, setH1] = useState(false);
  const [red, setRed] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [bold, setBold] = useState(false);

  //variables that stores the index of * and # symbols if entered
  const [idxOfSymbols, setSymbols] = useState<indexes>({
    hash: [],
    star: [],
  });

  //function to check and push indexes of * and # variable if present in text
  const intermediate_checking = () => {
    let hashtag: number[] = [];
    let startag: number[] = [];
    let local_text = text.split("");
    local_text.map((e: string, idx: number) => {
      if (e == "#") {
        hashtag.push(idx);
        setSymbols({ ...idxOfSymbols, hash: hashtag });
      }
      if (e == "*") {
        startag.push(idx);
        setSymbols({ ...idxOfSymbols, star: startag });
      }
    });
  };

  //function that does the final check and then based on specific conditions
  //met change the boolean properties to change css properties
  const final_Check = (e: indexes) => {
    let local_text = text.split("");

    if (e.hash.length > 0) {
      e.hash.map((v: number) => {
        if (local_text[v] == "#" && local_text[v + 1] == " ") {
          local_text.splice(v, 2);
          onChange(local_text.join(""));
          setH1(!h1);
        }
      });
    }

    if (e.star.length > 0) {
      e.star.map((v: number) => {
        if (local_text[v] == "*" && local_text[v + 1] == " ") {
          local_text.splice(v, 2);
          onChange(local_text.join(""));
          setBold(!bold);
        }
        if (
          local_text[v] == "*" &&
          local_text[v + 1] == "*" &&
          local_text[v + 2] == " "
        ) {
          local_text.splice(v, 3);
          onChange(local_text.join(""));
          setRed(!red);
        }
        if (
          local_text[v] == "*" &&
          local_text[v + 1] == "*" &&
          local_text[v + 2] == "*" &&
          local_text[v + 3] == " "
        ) {
          local_text.splice(v, 4);
          onChange(local_text.join(""));
          setUnderline(!underline);
        }
      });
    }
  };

  //this calls the firs programs that sorts through text to find indexes, change value of a
  //prop variable that stores the boolean variables that affects the css properties incase
  //if saved to local storage and finally to remnove or change everything to default value
  //if text is empty
  useEffect(() => {
    intermediate_checking();
    onValues({ RED: red, H1: h1, UNDELINE: underline, BOLD: bold });
    if (text == "") {
      setBold(false);
      setH1(false);
      setRed(false);
      setUnderline(false);
      setSymbols({ ...idxOfSymbols, hash: [], star: [] });
    }
  }, [text]);

  //this will check if locastorage had saved any variable to keep the css properties
  //on reload of the page
  useEffect(() => {
    const data = localStorage.getItem("Conditions");
    setH1(data ? JSON.parse(data).H1 : false);
    setBold(data ? JSON.parse(data).BOLD : false);
    setRed(data ? JSON.parse(data).RED : false);
    setUnderline(data ? JSON.parse(data).UNDELINE : false);
  }, []);

  useEffect(() => {
    final_Check(idxOfSymbols);
  }, [idxOfSymbols]);

  return (
    <>
      <div className="Display_File h-full w-full flex items-center justify-center p-[20px]">
        <textarea
          className={`min-h-[100%] w-full outline-none border-black border-[5px] p-[10px] resize-none ${
            h1 ? "text-3xl" : "text-sm"
          }
          ${red ? "text-red-600" : "text-black"}
           ${underline ? "underline" : ""} ${bold ? "font-bold" : ""} `}
          placeholder="Using # + <space> will make text h1, * + <space> will make text bold,  ** + <space> will make text red,  *** + <space> will make text underline"
          value={text}
          onChange={(e: any) => onChange(e.target.value)}
        />
      </div>
    </>
  );
}

export default Display;
