import {AppProvider} from "@/context/app-context";


export function Provider({ children }) {
    return (
        <AppProvider>
            {children}
        </AppProvider>
    )
}