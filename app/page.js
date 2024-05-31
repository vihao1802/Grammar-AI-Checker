"use client";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { HiMicrophone, HiClipboard } from "react-icons/hi";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { check_grammar } from "./action";
export default function Home() {
  const [text, setText] = useState("");
  const [textResult, setTextResult] = useState("Your result will appear here");
  const [loading, setLoading] = useState(false);

  const handleCheckGrammar = async () => {
    if (text === "") return alert("Please enter a sentence to check grammar");
    try {
      setLoading(true);
      const response = await check_grammar(text);
      if (response) {
        // console.log(response);
        setLoading(false);
        setTextResult(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center italic mt-6">
      <div className="text-center p-3 w-full max-w-[1100px] text-slate-900">
        <header className="mb-7">
          <h1 className="font-bold text-2xl">Grammer AI Checker</h1>
          <blockquote className="text-lg font-semibold text-center my-6">
            This is a simple web app that uses the
            <span className="mx-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block">
              <span className="relative text-white">Gemini API</span>
            </span>
            to check grammar of a given text.
          </blockquote>
        </header>
        <div className=" text-left">
          <div className="mb-10 shadow-lg md:p-3 p-0 rounded-md ">
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium text-xl">Your text:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center text-base items-center  text-gray-500 rounded cursor-pointer hover:text-gray-900 "
                >
                  <HiMicrophone className="text-xl" />
                  <span className="text-lg">Speak</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center text-base items-center  text-gray-500 rounded cursor-pointer hover:text-gray-900 "
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                  }}
                >
                  <HiClipboard className="text-xl" />
                  <span className="text-lg">Copy</span>
                </button>
              </div>
            </div>

            <div className="border-b pb-2">
              <textarea
                placeholder="Enter your sentence here"
                className="w-full border resize-none h-56 border-gray-400  px-3 py-2 "
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between md:p-0 p-3 mt-4">
              <div className="font-medium">
                <span>Words:</span>
                <span className="text-blue-500">
                  {" "}
                  {
                    text.split(" ").filter(function (n) {
                      return n != "";
                    }).length
                  }{" "}
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  text-white bg-blue-600 rounded-lg focus:ring-0  dark:focus:ring-blue-900 hover:bg-blue-800"
                  onClick={handleCheckGrammar}
                >
                  {loading ? (
                    <BeatLoader
                      color={"#ffffff"}
                      loading={loading}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Check and Improve writing"
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mb-10 shadow-lg md:p-3 p-0 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <p className="mb-2 font-medium text-xl">Result:</p>
              <div className="flex gap-2">
                <button
                  className="inline-flex justify-center text-base items-center  text-gray-500 rounded cursor-pointer hover:text-gray-900 "
                  onClick={() => {
                    navigator.clipboard.writeText(
                      textResult
                        .split("Here is the corrected text:")[1]
                        .replaceAll("*", "")
                    );
                  }}
                >
                  <HiClipboard className="text-xl" />
                  <span className="text-lg">Copy</span>
                </button>
              </div>
            </div>
            <div className="w-full border-b pb-2">
              <div className="w-full text-black">
                {loading ? (
                  <PropagateLoader
                    color={"#2196f3"}
                    loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="w-full text-center px-3 py-2 mb-2"
                  />
                ) : (
                  <Markdown>{textResult}</Markdown>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between md:p-0  p-3 mt-4">
              <div className="font-medium">
                <span>Words:</span>
                <span className="text-blue-500">
                  {" "}
                  {
                    textResult.split(" ").filter(function (n) {
                      return n != "";
                    }).length
                  }{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
