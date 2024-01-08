// components/MobileLayout.js
import React from "react";
import Link from "next/link";

const HEader = () => (
  <div className="flex items-center">
    <div className="text-center">
      <Link href="/">
        <span className="text-sm font-bold">
          Sanber.
          <strong className="font-bold text-red-700"> Daily Apps. </strong>
        </span>
      </Link>
    </div>
  </div>
);

export default HEader;
