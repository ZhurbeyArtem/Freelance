import React, {useEffect} from "react";

// that close window after login to google
export const googleSuccess = () =>{
    useEffect(() => {
        setTimeout( () => {
            window.close();
        }, 200);
    }, []);


    return <body><h3>Successful</h3></body>
}
