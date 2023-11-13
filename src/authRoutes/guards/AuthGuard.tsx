import React, { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseAuth';

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
            let userId = auth?.currentUser?.uid // Replace this with your actual user authentication logic
            if (!userId) {
                navigate(`/`); //auth routes shouldnot be visible without login, redirect to 401
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
