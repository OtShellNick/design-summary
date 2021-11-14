import React from "react";

import './Header.scss';

import {Nav} from "@components/Header/components/Nav/Nav";

export const Header = () => {

    return <header className='header'>
        <div className='container'>
            <h1 className='header__heading'>KSENIA UGAROVA</h1>
            <p className='header__subheading'>3D-VISUALISATION</p>
            <Nav/>
        </div>
    </header>
}