'use client';
import {useEffect, useState} from 'react';
import React from 'react';
import Link from 'next/link';
import { FaCalendarCheck} from "react-icons/fa";
import { usePathname} from "next/navigation";
import classnames from 'classnames';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";


const NavBar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const currentPath = usePathname();

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Tasks', href: '/tasks'},
        {label: 'Account', href: '/account'},
    ]

    useEffect(() => {
        const updateMobileStatus = () => setIsMobile(window.innerWidth <= 600);
        updateMobileStatus();

        window.addEventListener('resize', updateMobileStatus);

        return () => window.removeEventListener('resize', updateMobileStatus);
    }, []);

    return (
        <div className={`${
            isMobile ? "flex justify-end" : "flex justify-start"
        }`}>
            {isMobile ? (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button  className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                                 aria-label="Navigation Bar">
                            <HamburgerMenuIcon />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}
                    >
                    {links.map(link  =>
                        <DropdownMenu.Item
                            key={link.href}
                            onSelect={() => {
                                window.location.href = link.href;
                            }}
                            className={`group text-[13px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none ${link.href === currentPath ? 'text-black' : 'text-amber-600 hover:text-amber-900'}`}
                            disabled={currentPath === link.href}
                        >
                            {link.label}
                        </DropdownMenu.Item>
                    )}
                    </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            ) : (
                <nav className='flex space-x-6 border-b border-amber-600 mb-5 px-10 h-14 items-center'>
                    <Link href='/'><FaCalendarCheck/></Link>
                    <ul className='flex space-x-6'>
                        {links.map(link =>
                            <Link
                                key={link.href}
                                className={classnames({
                                    'text-amber-800': link.href === currentPath,
                                    'text-amber-400': link.href !== currentPath,
                                    'hover:text-amber-800 transition-colors': true
                                })}
                                href={link.href}>{link.label}
                            </Link>)
                        }
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default NavBar;