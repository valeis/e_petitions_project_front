import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({
  withoutFooter = false,
  children,
}: {
  withoutFooter?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      {children}
      {!withoutFooter && <Footer />}
    </>
  );
};
