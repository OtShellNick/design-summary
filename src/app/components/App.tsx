import React, {Suspense, lazy} from "react";
import {useSelector} from "react-redux";

import {Header} from "@components/Header/Header";

import {IInitialState} from "@/store";

const About = lazy(() => import('@components/About/export'));
const Portfolio = lazy(() => import('@components/Portfolio/export'));
const Price = lazy(() => import('@components/Price/export'));
const Contacts = lazy(() => import('@components/Contacts/export'));


export const App = () => {

    const activeNavTab = useSelector<IInitialState, string>(state => state.activeNavTab);

    return <>
        <Header/>
        <Suspense fallback={<span>Loading</span>}>
            {activeNavTab === 'about' && <About/>}
            {activeNavTab === 'portfolio' && <Portfolio/>}
            {activeNavTab === 'price' && <Price/>}
            {activeNavTab === 'contacts' && <Contacts/>}
        </Suspense>
    </>
}