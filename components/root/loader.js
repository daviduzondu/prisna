import { RotatingLines } from "react-loader-spinner";
export default function Loading({ children, width, height}) {
  return (
    <>
      <RotatingLines width={width} height={height}/>
    </>
  );
}
