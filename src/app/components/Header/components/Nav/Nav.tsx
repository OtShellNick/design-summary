import React from "react";
import classnames from "classnames";
import {useDispatch, useSelector} from "react-redux";

import './Nav.scss';

import {setActiveMenuCreator} from "@/actions/setActiveMenuAction";
import {IInitialState} from "@/store";

interface IMenu {
    name: string;
    tag: string;
}

export const Nav = () => {
    const dispatch = useDispatch();
    const activeNavTab = useSelector<IInitialState, string>(state => state.activeNavTab);

    const MENU: Array<IMenu> = [
        {
            name: 'Обо мне',
            tag: 'about'
        },
        {
            name: 'Портфолио',
            tag: 'portfolio'
        },
        {
            name: 'Услуги и цены',
            tag: 'price'
        },
        {
            name: 'Контакты',
            tag: 'contacts'
        }
    ];

    return <nav className='header__nav'>
        <ul className='header__nav_list'>
            {MENU.map(({name, tag}, i) => <li
                className={classnames({
                    'header__nav_item': true,
                    'header__nav_item-active': activeNavTab === tag
                })}
                key={i}
            onClick={() => dispatch(setActiveMenuCreator(tag))}>{name}</li>)}
        </ul>
    </nav>
}