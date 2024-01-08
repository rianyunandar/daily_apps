// components/MobileLayout.js
import React from "react";
import Link from "next/link";

const MobileLayout = ({ children }) => (
  <div className="mobile-layout container mx-auto">
   
    {children}
  </div>
);

export default MobileLayout;
