import { createContext } from "react";
import { doctors } from "../assets/assets";

// Create the context
export const AppContext = createContext();

// Context Provider Component
const AppContextProvider = (props) => {

    const currencySymbol = '$'

    // Define the value to be provided
    const value = {
        doctors,
        currencySymbol

    };

    // Return the provider with the value and children
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
