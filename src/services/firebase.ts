import { app } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ref, set, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

interface Form {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password?: string;
}
const auth: any = getAuth(app);
const db = database;

export const signupUser = async(email: string, password: string) => {
    const signup = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            return true;
            // ...
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode);
            // ..
        });
        if (signup) {
            return true;
        }
}

export const createUserInDb = function writeUserData(userId: any, formData: Form) {
    set(ref(db, 'users/' + userId), {
        formData
    });
}

export const getUserData = () => {
    const userId = auth?.currentUser.uid;
    return onValue(ref(db, '/users/' + userId), (snapshot) => {
        const user = (snapshot.val()) || 'Anonymous';
        return user;
    }, {
        onlyOnce: true
    });
}

export const handleLogin = async () => {
    try {
        console.log('User Login:', {  });

        // Uncomment the following lines when you have the loginUser function
        // const user = await loginUser(formData.email, formData.password);

        // if (user) {
        //     const newUser = { ...user, login: true };
        //     dispatch(addUser(newUser));
        //     setFormData({
        //         email: '',
        //         password: '',
        //     });
        //     console.log('User successfully logged in:', newUser);
        // } else {
        //     console.error('Invalid email or password');
        // }

    } catch (error) {
        console.error('Error during user login:', error);
        // Handle errors (e.g., show an error message to the user)
    }
};

