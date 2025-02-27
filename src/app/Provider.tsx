"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";

export default function Provider({ children }:{children: React.ReactNode}) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
