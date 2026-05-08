import React from "react";

import "./dashboard.css";

interface childrenInterface {
  children: React.ReactNode;
}

const blogsLayout = ({ children }: childrenInterface) => {
  return (
    <div>
      <header className="navContainer">
        <ul className="listStyle">
          <li>link 1</li>
          <li>link 2</li>
          <li>link 3</li>
          <li>link 4</li>
        </ul>
      </header>
      {children}
    </div>
  );
};

export default blogsLayout;
