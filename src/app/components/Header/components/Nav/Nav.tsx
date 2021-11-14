import React from "react";

import './Nav.scss';

interface IMenu {
    name: string;
}
export const Nav = () => {

    const MENU: Array<IMenu> = [
        {
            name: 'Обо мне'
        },
        {
            name: 'Портфолио'
        },
        {
            name: 'Услуги и цены'
        },
        {
            name: 'Контакты'
        }
    ]

    return <nav className='header__nav'>
        <ul className='header__nav_list'>
            {MENU.map(({name}, i) => <li className='header__nav_item' key={i}>{name}</li>)}
        </ul>
    </nav>
}