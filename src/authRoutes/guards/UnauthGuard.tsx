import React, { useEffect, ReactNode } from 'react';

interface UnAuthGuardProps {
    component: ReactNode;
}

const UnAuthGuard: React.FC<UnAuthGuardProps> = ({ component }) => {
    useEffect(() => {
        console.log("UnAuth Guard");
    }, [component]);

    return <>{component}</>;
}

export default UnAuthGuard;