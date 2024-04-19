import { FC, ReactNode, useSyncExternalStore  } from "react";
// import { League_Spartan } from "@next/font/google";
// import classNames from "classnames";

// const spartan = League_Spartan({
//   subsets: ["latin"],
//   weight: "700",
//   variable: "--font-spartan",
// });

interface ILayoutProps {
  children: ReactNode;
}

const subscribe = (callback: () => void) => {
    window.addEventListener("resize", callback);
  
    return () => {
      window.removeEventListener("resize", callback);
    };
  };
  
  const getSnapshot = () => `${window.innerHeight}`;
  
  const getServerSnapshot = () => "100vh";

const useWindowHeight = () => {
    const height = useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );
  
    return { height };
};

const Layout: FC<ILayoutProps> = ({ children }) => {
//   const { theme } = useThemeContext();
  const { height } = useWindowHeight();

  return (
    <div
    //   className={classNames(theme, spartan.variable)}
      style={{ minHeight: height }}
    >
      {children}
    </div>
  );
};

export { Layout };