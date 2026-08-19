import Navbar from "@/components/nav/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import authBg from "@/assets/images/authBg.png";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6">
      <Card className="relative md:min-h-200 w-full max-w-6xl overflow-hidden flex flex-col">
        {/* Mobile background */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={authBg}
            alt=""
            fill
            sizes="592"
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-card/80" />
        </div>
        {/* Logo Image */}
        <div className="flex justify-center items-center z-10">
          <Image
            src="/dpdc-logo.svg"
            alt="DPDC"
            width={220}
            height={64}
            priority
            className="h-22 w-auto"
          />
        </div>
        <div className="relative w-full flex-1 flex flex-col md:flex-row">
          {/* Desktop image */}
          <div className="relative hidden md:block md:w-1/2">
            <Image
              src={authBg}
              alt="Authentication"
              fill
              priority
              className="object-cover"
              sizes="592"
            />
          </div>

          <Separator orientation="vertical" className="hidden md:block" />

          {/* Form */}
          <CardContent className=" relative z-10 w-full md:w-1/2 flex flex-col justify-center p-6">
            {children}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
