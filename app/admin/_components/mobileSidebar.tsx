import Link from "next/link";
import React from "react";
import {
  HomeIcon,
  Layers,
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Warehouse,
} from "lucide-react";

const MobileSidebar = () => {
  const sidebarItems = [
    { label: "Dashboard", href: "/admin", icon: HomeIcon },
    { label: "Products", href: "/admin/products", icon: Layers },
    { label: "Warehouses", href: "/admin/warehouses", icon: Warehouse },
    { label: "Deliver Persons", href: "/admin/delivery-persons", icon: Truck },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Inventories", href: "/admin/inventories", icon: LayoutDashboard },
  ];

  return (
    <nav className="grid gap-2 text-lg font-medium">
      {sidebarItems.map((item) => {
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileSidebar;
