import React from 'react';
import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {authRoutes, publicRoutes} from "../routes";



const AppRouter = () => {
    const {isAuth} = useSelector((state:any) => state.user);

    return (
        <>
            <Routes  >
                {isAuth && authRoutes.map(({path, Element}) =>
                    <Route key={path} path={path} element={<Element  />}/>
                )}
                {publicRoutes.map(({path, Element}) =>
                    <Route key={path} path={path} element={<Element  />}/>
                )}

            </Routes>
        </>
    );
};

export default AppRouter;
