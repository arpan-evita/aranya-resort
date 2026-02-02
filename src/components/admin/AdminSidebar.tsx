import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CalendarDays, 
  BedDouble, 
  Package, 
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  ChevronLeft,
  TreePine,
  Images
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isSuperAdmin: boolean;
}

const navItems = [
  { 
    title: "Dashboard", 
    href: "/admin", 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    title: "Bookings", 
    href: "/admin/bookings", 
    icon: CalendarDays 
  },
  { 
    title: "Rooms", 
    href: "/admin/rooms", 
    icon: BedDouble 
  },
  { 
    title: "Packages", 
    href: "/admin/packages", 
    icon: Package 
  },
  { 
    title: "Gallery", 
    href: "/admin/gallery", 
    icon: Images 
  },
  { 
    title: "Pricing", 
    href: "/admin/pricing", 
    icon: DollarSign 
  },
  { 
    title: "Enquiries", 
    href: "/admin/enquiries", 
    icon: MessageSquare 
  },
  { 
    title: "Reports", 
    href: "/admin/reports", 
    icon: BarChart3 
  },
  { 
    title: "Settings", 
    href: "/admin/settings", 
    icon: Settings 
  },
];

export function AdminSidebar({ collapsed, onToggle, isSuperAdmin }: AdminSidebarProps) {
  const location = useLocation();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border/50 transition-all duration-300 ease-in-out",
        "bg-[hsl(var(--forest-deep))] text-white",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center border-b border-white/10 px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className={cn("flex items-center gap-3", collapsed && "hidden")}>
          <TreePine className="h-7 w-7 text-[hsl(var(--gold))]" />
          <div>
            <h1 className="font-serif text-lg font-medium text-white">Aranya</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/60">Admin</p>
          </div>
        </div>
        {collapsed && (
          <TreePine className="h-7 w-7 text-[hsl(var(--gold))]" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white",
            collapsed && "hidden"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.exact}
              className={({ isActive: routeActive }) => cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-2",
                (item.exact ? routeActive : isActive(item.href, item.exact))
                  ? "bg-[hsl(var(--gold))] text-[hsl(var(--forest-deep))]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}

          {/* Super Admin Only - Users */}
          {isSuperAdmin && (
            <NavLink
              to="/admin/users"
              className={({ isActive: routeActive }) => cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 mt-4 pt-4 border-t border-white/10",
                collapsed && "justify-center px-2 border-t-0 mt-2 pt-2",
                routeActive
                  ? "bg-[hsl(var(--gold))] text-[hsl(var(--forest-deep))]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Users className={cn("h-5 w-5 flex-shrink-0")} />
              {!collapsed && <span>Staff Management</span>}
            </NavLink>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
}
