'use client';
import Image from 'next/image';
import image from '../../public/card/dummy.png'
import { FaGithub } from "react-icons/fa";

export default function ThemeCard({ item = {}, highlightField  }) {
  const hasData = Boolean(item.data);
  const previewSrc = item.preview || image;
  const title = item.data?.title || 'No Title';
  const description = item.data?.description || 'No description available.';
  const name = item.data.author || 'Author';
  const highlightValue = item.data?.[highlightField] || "N/A";
  const displayValue = item.data?.[highlightField] ?? "N/A";


  return (
    <article className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out max-w-xs mx-auto">
      <div className="relative w-full h-48 rounded-md overflow-hidden mb-3 bg-gray-100">
        {hasData ? (
          <Image
            src={previewSrc}
            alt={title}
            width={400}
            height={192}
            className="object-cover"
            priority={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
            No preview
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold mb-1 truncate" title={title}>
        {title}
      </h2>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
       {/* Show highlight field name and value */}
      <p className="mt-2 text-sm text-gray-600">
      {highlightField.replace(/_/g, " ").toUpperCase()}:{" "}
      <span className="font-semibold text-indigo-600">{displayValue}</span>
    </p>
      <h3 className="font-semibold text-gray-800 truncate" title={name}>
        {name}
      </h3>
      <a href=""><FaGithub /></a>
    </article>
  );
}
