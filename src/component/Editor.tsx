import { Values } from "../App";

const Editor = ({
  text,
  currentConditions,
  onChange,
}: {
  text: any;
  currentConditions: Values;
  onChange: (e: string) => void;
}) => {
  return (
    <>
      <div className="Editor_File h-full w-full flex items-center justify-end p-[15px] gap-[10px]">
        <button
          className=" h-[50px] w-[180px] bg-black text-white font-bold text-md rounded-lg"
          onClick={() => {
            localStorage.removeItem("name");
            localStorage.removeItem("Conditions");
            onChange("");
          }}
        >
          CLEAR
        </button>
        <button
          className=" h-[50px] w-[180px] bg-black text-white font-bold text-md rounded-lg"
          onClick={() => {
            localStorage.setItem("name", text);
            localStorage.setItem(
              "Conditions",
              JSON.stringify(currentConditions)
            );
          }}
        >
          SAVE
        </button>
      </div>
    </>
  );
};

export default Editor;
