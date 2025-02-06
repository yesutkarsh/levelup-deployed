import { createContext, useState } from "react";

export const AuthToggle = createContext(null);

export const AuthToggleProvider = (props) => {
    const [authCard, setAuthCard] = useState(false);

    // Toggle auth card
    function toggleAuthCard() {
        setAuthCard(prev => !prev);
    }

    return (
        <AuthToggle.Provider value={{ authCard, toggleAuthCard }}>
            {props.children}
        </AuthToggle.Provider>
    );
};
