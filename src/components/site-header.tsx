import { Link } from "@tanstack/react-router";

import { HeaderSettings } from "@/components/header-settings";
import { HeaderUser } from "@/components/header-user";
import { ThemeToggle } from "@/components/theme-toggle";

const user = {
  name: "Demo User",
  email: "demo@garvata.com",
  avatar: "",
};

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo192.svg" alt="Garvata" className="h-6 w-6" />
          <h1 className="text-lg font-semibold">GarvataAI</h1>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <HeaderSettings />
          <HeaderUser user={user} />
        </div>
      </div>
    </header>
  );
}
