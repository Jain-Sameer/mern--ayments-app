import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "User 1";
  const userId = searchParams.get("id");
  const [amount, setAmount] = useState(0);
  return (
    <div className="p-10 my-5 mx-auto w-2/5 border-gray-300 border-2 shadow-md shadow-slate-500 relative top-32 rounded-md ">
      <h1 className="text-4xl font-semibold text-center">Send Money</h1>
      <div className="flex flex-row mt-12 items-center justify-stretch">
        <span className="mr-5 w-12 h-12 border-rounded rounded-full text-center bg-green-700 text-xl p-3 text-white font-semibold">
          {name.split(" ")[0][0] + name.split(" ")[1][0].toUpperCase()}
        </span>
        <span className="text-2xl font-bold">
          {searchParams.get("name") || "User 1"}{" "}
        </span>
      </div>
      <p className="font-semibold text-xl my-5">Amount (in Rs)</p>
      <input
        className="border-gray-300 border-2 border-rounded rounded-md w-full p-3"
        placeholder="Enter Amount"
        type="number"
        min={0}
        onChange={(e) => {
          setAmount(parseInt(e.target.value));
        }}
      />
      <button
        className="my-4 font-semibold text-lg bg-green-700 w-full p-2 text-white border-rounded rounded-md"
        onClick={async () => {
          await fetch("http://localhost:3000/api/v1/account/transfer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              to: userId,
              amount: amount,
            }),
          });
        }}
      >
        Initiate Transfer
      </button>
    </div>
  );
};
