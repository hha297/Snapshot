import { bottombarLinks } from '@/constants';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Bottombar = () => {
        const { pathname } = useLocation();
        return (
                <section className="bottom-bar">
                        {bottombarLinks.map((link) => {
                                const isActive = pathname === link.route;
                                return (
                                        <NavLink
                                                to={link.route}
                                                key={link.label}
                                                className={`group ${
                                                        isActive && 'bg-primary-500 rounded-xl'
                                                } flex-center flex-col gap-2 py-2 px-8 transition`}
                                        >
                                                <img
                                                        src={link.imgURL}
                                                        alt={link.label}
                                                        className={`group-hover:invert-white ${
                                                                isActive && 'invert-white'
                                                        }`}
                                                        width={16}
                                                        height={16}
                                                />
                                                <p className="tiny-medium text-light-2">{link.label}</p>
                                        </NavLink>
                                );
                        })}
                </section>
        );
};

export default Bottombar;
