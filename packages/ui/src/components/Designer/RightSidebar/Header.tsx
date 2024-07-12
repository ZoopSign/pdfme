import React, { useState } from 'react';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #EAE6F6',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    color: '#6B52AD',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const hoverStyle = {
    background: '#EAE6F6',
  };

  const combinedStyle = isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

  return (
    <header
      style={{
        height: '80px',
        borderBottom: '1px solid #DBDBDB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 20px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white', // Optional: Ensures the header has a background color
        zIndex: 1000, // Optional: Ensures the header stays on top
      }}
      // className="flex h-20 items-center justify-between border-b-stone-950 border-b"
    >
      <strong>Document Name</strong>

      <button
        style={combinedStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // className="flex gap-1 justify-center px-3 py-2.5 text-xs font-medium leading-5 rounded-lg border border-solid text-slate-500"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/68ca08d6f97e91750979d520a49de828fd3ede141c061cf86c008a1dfc4ab4bd?apiKey=79b251e4359b4e7d9dc703725f0ff91a&"
          className="shrink-0 my-auto border-2 border-solid aspect-[0.92] border-slate-500 stroke-[1.5px] stroke-slate-500 w-[11px]"
          alt=""
        />
        <span>Save Template</span>
      </button>
    </header>
  );
};

export default Header;

// const Header = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   const baseClasses = 'flex items-center justify-center gap-1 px-3 py-2 rounded-lg border transition-colors duration-300 cursor-pointer font-bold text-[16px] text-[#6B52AD]';
//   const hoverClasses = 'bg-[#EAE6F6]';

//   return (
//     <header
//       className="sticky top-0 flex h-20 items-center justify-between border-b border-[#DBDBDB] px-5 bg-white z-50"
//     >
//       <strong>Document Name</strong>

//       <button
//         className={`${baseClasses} ${isHovered ? hoverClasses : ''}`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/68ca08d6f97e91750979d520a49de828fd3ede141c061cf86c008a1dfc4ab4bd?apiKey=79b251e4359b4e7d9dc703725f0ff91a&"
//           className="shrink-0 my-auto border-2 aspect-[0.92] border-slate-500 stroke-[1.5px] w-[11px]"
//           alt=""
//         />
//         <span>Save Template</span>
//       </button>
//     </header>
//   );
// };

// export default Header;
