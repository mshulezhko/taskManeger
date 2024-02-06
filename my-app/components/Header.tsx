"use client";
import fetchSuggestion from "@/lib/fetchSuggastion";
import { BoardStore } from "@/store/BoardStore";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";

const Header = () => {
  const [board, searchString, setSearchString] = BoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="absolute pot-0 left-0 w-full h-96 bg-gradient-to-br from-yellow-400 to-green-700 rounded-md filter blur-3xl opacity-50 -z-50"></div>

      <div className="flex flex-col md:flex-row items-center p-5 md:space-between">
        <div className="p-5 text-6xl">🎯</div>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-mb flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="M M" round color="green" size="50" />
        </div>
      </div>
      <div className="flex items-center justify-center p-5 px-5 md:py-5">
        <p className="flex text-blue-800 items-center text-sm italic font-light p-5  pr-5 shadow-xl rounded-xl w-fit bg-white max-w-xl ">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[green] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion + " 🎯"
            : "GPT is summarising..."}
        </p>
      </div>
    </header>
  );
};

export default Header;
