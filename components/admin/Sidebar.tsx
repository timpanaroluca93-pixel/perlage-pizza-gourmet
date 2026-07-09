"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  TicketIcon,
  TruckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: HomeIcon,
  },
  {
    title: "Prenotazioni",
    href: "/admin/prenotazioni",
    icon: CalendarDaysIcon,
  },
  {
    title: "CRM Clienti",
    href: "/admin/clienti",
    icon: UsersIcon,
  },
  {
    title: "Coupon",
    href: "/admin/coupon",
    icon: TicketIcon,
  },
  {
    title: "Delivery",
    href: "/admin/delivery",
    icon: TruckIcon,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: ChartBarIcon,
  },
  {
    title: "Impostazioni",
    href: "/admin/impostazioni",
    icon: Cog6ToothIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-[#090909]">

      <div className="border-b border-white/10 p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#D2B07A]">
          Perlage
        </p>

        <h1 className="mt-3 text-3xl font-light text-white">
          OS
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Restaurant Management
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">

        {menu.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200
              ${
                active
                  ? "bg-[#D2B07A]/15 border border-[#D2B07A]/30 text-[#D2B07A]"
                  : "border border-transparent text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-6 w-6" />

              <span className="font-medium">
                {item.title}
              </span>

            </Link>
          );
        })}

      </nav>

      <div className="border-t border-white/10 p-6">

        <div className="rounded-2xl border border-[#D2B07A]/20 bg-[#D2B07A]/10 p-5">

          <p className="text-xs uppercase tracking-[0.25em] text-[#D2B07A]">
            Perlage OS
          </p>

          <p className="mt-2 text-sm text-white/70">
            Versione 1.0
          </p>

        </div>

      </div>

    </aside>
  );
}