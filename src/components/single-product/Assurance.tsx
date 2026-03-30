import React from "react";
import {
  ShieldCheck,
  Clock,
  FileSearch,
  TrendingDown,
  Shield,
} from "lucide-react";
import { MenuWithIconType } from "@/types/menus";

const GUARANTEE_FEATURES: MenuWithIconType[] = [
  { label: "100% money back guarantee", icon: ShieldCheck },
  { label: "On time guarantee", icon: Clock },
  { label: "Detailed inspection", icon: FileSearch },
  { label: "Lower exchange loss", icon: TrendingDown },
  { label: "Security & Privacy", icon: Shield },
];

export const Assurance = () => {
  return (
    <div className="w-full bg-white p-4 rounded-lg border">
      <h4 className="text-lg font-medium">Move Sky Assurance</h4>
      <ul className="space-y-1.5 mt-2">
        {GUARANTEE_FEATURES.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              key={i}
              className="flex justify-start items-center gap-1 text-sm"
            >
              {Icon && <Icon size={15} className="text-sky-600" />}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
