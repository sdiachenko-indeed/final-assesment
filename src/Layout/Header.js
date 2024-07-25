import React from "react";

function Header() {
  return (
    <header
      className="mb-3 relative bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?education')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative container text-center py-20">
        <h1 className="text-5xl font-bold text-white">Flashcard-o-matic</h1>
        <p className="text-xl mt-4 text-white">
          Discover The Flashcard Difference.
        </p>
      </div>
    </header>
  );
}

export default Header;
