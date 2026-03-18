import React from "react";
import { PrimaryLayout } from "../Layouts";
import { FOOTER_LEGAL_LINKS, FOOTER_MENUS, PAYMENT_METHODS } from "@/constants";
import Link from "next/link";
import { Logo } from "../Logo";
import { Label } from "@/components/ui";
import { Mail, Map, MapPin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="mt-auto bg-white px-3 border-t border-border w-full h-fit">
      <PrimaryLayout>
        <div className="w-full border-b grid grid-cols-4 py-10">
          {Object.entries(FOOTER_MENUS).map(([Key, value], i) => {
            return (
              <div key={i}>
                <p className="text-sm text-black font-medium">{Key}</p>
                <ul className="flex flex-col gap-1 mt-3">
                  {value.map((item, j) => {
                    return (
                      <Link
                        href={item.slug}
                        className="text-sm font-medium text-neutral-500 hover:text-black"
                        key={j}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div>
            <p className="text-sm font-medium text-neutral-500">
              Payment Method We Accept
            </p>
            <div className="mt-3">
              <Image
                src={"/payment_cropped.png"}
                alt="Payment methods"
                width={200}
                height={200}
                className="w-[150px] object-contain object-center  "
              />
            </div>
          </div>
        </div>
        <div className="border-b  py-10 flex justify-center items-center ">
          <div className="flex flex-col items-center gap-3 ">
            <Logo />
            <Label>
              <MapPin size={18} /> Plot 1020, Road 9 Avenue 9, Mirpur-DOHS,
              Dhaka 1216
            </Label>
            <Label>
              <Mail size={18} /> support@movesky.com.bd
            </Label>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 py-5">
          <p className="text-sm text-neutral-500 font-medium">
            © 2019-2026 MoveSky Technologies Ltd. All rights Reserved.
          </p>
          <div className="flex items-center gap-1">
  {FOOTER_LEGAL_LINKS.map((link, index) => (
    <React.Fragment key={link.slug}>
      <Link href={`/${link.slug}`} className="text-sm text-neutral-500 font-medium hover:underline">
        {link.label}
      </Link>
      {index < FOOTER_LEGAL_LINKS.length - 1 && (
        <span className="text-neutral-500">•</span>
      )}
    </React.Fragment>
  ))}
</div>
        </div>
      </PrimaryLayout>
    </div>
  );
};
