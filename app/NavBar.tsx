'use client';
import React from 'react';
import Link from 'next/link';
import { FaCalendarCheck} from "react-icons/fa";
import { usePathname} from "next/navigation";
import classnames from 'classnames';


const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Tasks', href: '/tasks'},
    ]
    return (
        <nav className='flex space-x-6 border-b border-amber-600 mb-5 px-10 h-14 items-center'>
            <Link href='/'><FaCalendarCheck /></Link>
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
    );
};

export default NavBar;