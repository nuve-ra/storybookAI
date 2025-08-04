"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React  from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import { useState,useEffect } from "react";
import { db } from "@/config/db";
import { StoryData, Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  // const [userDetail,setUserDetail]=useState<any>()
  // const {user}=useUser()

  // useEffect(()=>{
  //   user&&saveNewUserIfNotExist();

  // },[user])
  // const saveNewUserIfNotExist=async()=>{
  //   //Check whether the user exist ot rnot
    // const userResp=await db.select()
    // .from(Users).where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))
    // console.log("Existing User",userResp);

  //   if(!userResp[0])
  //   {
  //     const result=await db.insert(Users).values ({
  //       userEmail:user?.primaryEmailAddress?.emailAddress,
  //       userImage:user?.imageUrl,
  //       userName:user?.fullName
  //     }).returning({
  //       userEmail:Users.userEmail,
  //       userName:Users.userName,
  //       userImage:Users.userImage,
  //       credit:Users.credit
  //     })
  //     console.log("New User",result[0])
  //     setUserDetail(result[0])
  //   }else{
  //     setUserDetail(userResp[0])
  //   }
  // }

  return (
  <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??'' }}>
    <HeroUIProvider navigate={router.push}>
      <ClerkProvider>       
        <NextThemesProvider {...themeProps}>
          <Header />
          {children}
        </NextThemesProvider>
      </ClerkProvider>
    </HeroUIProvider>
  </PayPalScriptProvider>
);

}
