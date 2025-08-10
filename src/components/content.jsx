"use client";
import { useEffect, useState } from "react";

export default function Content() {
  const [filterItem, setFilterItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorted, setSorted] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://astrothemes.club/data/themes.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((apiData) => {
        setFilterItem(apiData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Api data:", err);
        setError("Failed to load Api Data.");
        setLoading(false);
      });
  }, []);
console.log(filterItem);
const sortIteamdata=filterItem.map((items, i)=>{items.data.price})
const sortData=sortIteamdata.sort(function(a,b) {return a-b});
console.log(sortData);


  if (loading) {
    return <div className="text-center mt-10 text-3xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-10">
      <header className="my-10 border-b pb-4 flex items-center justify-between">
         <ul>
            <li className="">
               Astro
            </li>
         </ul>
         <select className="border border-gray-300 px-3 py-2 rounded-md" name="" id="">
            <option value="">Default</option>
            <option value="">star</option>
            <option value="">Fork</option>
            <option value="">Price</option>
            <option value="">Update</option>
         </select>
      </header>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filterItem.map((cardData,i) => (
          <div
            key={i}
            className="p-4 border rounded-md border-gray-300 text-left hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
               <h2 className="font-bold text-lg">{cardData.data?.author}</h2>
               <h3 className="font-semibold">{cardData.data?.title}</h3>
               <p className="text-sm text-gray-600 text-balance">{cardData.data?.description}</p>
            </div>
            <div>
               <div className="flex justify-between">
                  <p>Star: {cardData.data.github_star}</p>
                  <p>Fork:{cardData.data.github_fork}</p>
               </div>
                <div className="flex justify-between">
                  <p>Price:{cardData.data.price}</p>
                  <a href={cardData.data?.github} target="_blank" className="underline w-fit">Github Link</a>
               </div>
               <p>Update_AT: {cardData.data.update_date}</p>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
}
