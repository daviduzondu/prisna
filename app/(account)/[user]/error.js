"use client";
export default function Error() {
  return (
    <div className="flex items-center h-screen w-screen justify-center flex-col gap-3">
      <div className="text-9xl font-black">Hmmm....</div>
      <span className="text-4xl">That account does not exist!</span>
    </div>
  );
}
