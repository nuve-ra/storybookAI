"use client"
import React, { useState } from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { UserButton, useUser } from '@clerk/nextjs';
function Header() {
    const MenuList=[
        {
            name:'Home',
            path:'/'
        },
        {
            name:'Create Story',
            path:'/create-story'
        },
        {
            name:'Contact Us',
            path:'/contact'
        },
        {
            name:'Explore Stories',
            path:'/explore'
        }
    ]
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const {user,isSignedIn}=useUser();
  return (
    <Navbar maxWidth='full'  onMenuOpenChange={setIsMenuOpen} >
        <NavbarContent>
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close Menu" : "Open Menu"} className='sm:hidden'/>
            <NavbarBrand>
                <Image src={'./logo.svg'} alt='logo' height={40} width={40}/>
                <h2 className='font-bold text text-primary ml-3'>Kidzz Story</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex' >
            {MenuList.map((item,index)=>(
                <NavbarItem className='text-xl text-primary font-medium hover:underline mx-3'>
                    <Link href={item.path}>
                    {item.name} 
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
            <Button color='primary'>
                {isSignedIn ? "Dashboared" : "Get Started"}
            </Button>
            </Link>
            <UserButton/>
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item,index)=>(
                <Link href={item.path}>
                    {item.name}
                </Link>

            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header