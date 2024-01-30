import { useContext } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Sidebar() {
  const login = useContext(AuthContext);
  return (
    <ScrollArea className="h-screen w-350px">
      <div className=""></div>
    </ScrollArea>
  );
}
