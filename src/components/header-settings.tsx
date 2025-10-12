import { IconHelp, IconSearch, IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const settingsItems = [
  {
    title: "Settings",
    icon: IconSettings,
    url: "#",
  },
  {
    title: "Get Help",
    icon: IconHelp,
    url: "#",
  },
  {
    title: "Search",
    icon: IconSearch,
    url: "#",
  },
];

export function HeaderSettings() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconSettings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {settingsItems.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <a href={item.url} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
