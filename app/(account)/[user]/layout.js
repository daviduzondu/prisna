import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { Suspense } from "react";

export default function Layout({ children }) {
  // console.log('')
  //   console.log("params", params);
  //   console.log("userDetails", userDetails);
  return (
    // <ErrorBoundary fallbackRender={<Error />}>
      <div className="flex gap-10">
        {children}
      </div>
    // </ErrorBoundary>
  );
}
