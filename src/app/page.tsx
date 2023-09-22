import PagesLayout from "./(pages)/layout";
import Home from "./(pages)/home/page";
import { useState } from "react";

export default function Main() {

  const loginStatus = false                      

  return !loginStatus && (
    <PagesLayout>
      <Home />
    </PagesLayout>
  );
}