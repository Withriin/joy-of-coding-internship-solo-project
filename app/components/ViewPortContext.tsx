'use client';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

interface ViewportContextType{
    isMobile: boolean;
}

const ViewportContext = createContext<ViewportContextType | undefined>(undefined);

interface ViewportProviderProps{
    children: ReactNode;
}

export const ViewportProvider: React.FC<ViewportProviderProps> = ({ children})  => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth <= 600);

        checkIfMobile(); // Initial check
        window.addEventListener('resize', checkIfMobile); // Add resize listener

        return () => window.removeEventListener('resize', checkIfMobile); // Clean up
    }, []);

    return (
        <ViewportContext.Provider value={{ isMobile }}>
            {children}
        </ViewportContext.Provider>
    );
};

export const useViewport = () => {
    const context = useContext(ViewportContext);
    if(context === undefined){
        throw new Error('useViewport must be used within a ViewportProvider')
    }
    return context;
}