import { useState } from "react";
import "./App.css";
import {SearchResults, ProcessRaw} from "./Search";


function App() {
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="h-screen flex-col w-screen md:max-w-xl">
      <h1 className="text-3xl font-bold">Karaoke!!</h1>
      <form className="relative" onSubmit={async (event) => {
            event.preventDefault();
            const yt_results = await fetch("http://localhost:3000/search/"+searchValue).then((response) => response.json())
            console.log(yt_results)
            setSearchResults(ProcessRaw(yt_results))
            }}>
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required onChange={e => setSearchValue(e.target.value)}/>
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </form>
      {/* <SearchResults results={[{
          title:"How to Download Free Music On Your iPhone (OFFLINE) 2020",
          thumbnail:{
            url: "https://i.ytimg.com/vi/y5kIrbG2gRc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA-pk9HLDSz4VelSFZ01ceyeIpBSw",
            width: 246,
            height: 138
          },
          videoId: "y5kIrbG2gRc",
          videoUrl: "https://www.youtube.com/watch?v=y5kIrbG2gRc"
        }]}/> */}
      <SearchResults results={searchResults}/>
    </div>
  );
}

export default App;
