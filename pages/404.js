import React from "react";
import Link from "next/link";

const error = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Something went wrong....</h1>
        <h3>
          Error 404, Click <Link href="/">here</Link> to return to home page
        </h3>
        <div>
          <img
            style={{
              width: "1000px",
              height: "1000px",
            }}
            alt="error 404 image"
            src="/7.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default error;
