import React, { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
    component: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Auth Guard");
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            let user = ''; // Replace this with your actual user authentication logic
            if (!user) {
                navigate(`/`);
            }
            setStatus(true);
            return;
        } catch (error) {
            navigate(`/`);
        }
    }

    return (
        status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>
    )   
}

export default AuthGuard;
