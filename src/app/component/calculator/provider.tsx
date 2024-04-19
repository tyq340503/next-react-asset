"use client";

import { FC, PropsWithChildren } from "react";

import { CalculatorProvider } from "../../context/calculateProvider";
// import { ThemeProvider } from "theme";
import { Layout } from "../layout";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
      <CalculatorProvider>
        <Layout>{children}</Layout>
      </CalculatorProvider>
  );
};