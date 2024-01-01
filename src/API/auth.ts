import { ISLOCAL } from "../public_vars";
import { addStudentDoc, addTeacherDoc } from "./database";
import { app } from "./firebase";
import authRaw from "../../LocalData/auth.json"

import {
    getAuth, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword, setPersistence ,signInWithEmailAndPassword, browserSessionPersistence, updateProfile, confirmPasswordReset,
} from "firebase/auth";

const getAuthReady = async () => {
    const auth = getAuth(app)
    await auth.authStateReady()
    return auth
}

// let loggedIn = -1;
let loggingIn = false
// onAuthStateChanged(auth, user => {
//     if (user) {
//         console.log('user logged in: ', user);
//         //Check if on login page
//         if(window.location.href.includes("Login") && !loggingIn){
//             window.location.href = window.location.origin + "/Dashboard/"
//         }
//         loggedIn = 1;
        
//     } else {
//         console.log('user logged out');
//         //Redirect to login page
//         if(!window.location.href.includes("Login") && !window.location.href.includes("friendLink")){
//             window.location.href = "/Login/"
//         }
//         loggedIn = 0;
//     }
// })


  export async function createUser(name: string, email: string, password: string, isTeacher: boolean, onFinish: () => void, onError: (error: string, errorTitle: string) => void){
    const auth = await getAuthReady();
    loggingIn = true;
    console.log("Emal: " + email + " Password: " + password)
    await createUserWithEmailAndPassword(auth,email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser!, {
            displayName: name
          }).then(async () => {
            // Profile updated!
            // AddDoc_CustomID(db,"users", {Name: full_name, Email: email},user.uid).then(() => {
            //     console.log("Account Created Successfully" + auth.currentUser.displayName)
            //     onLogin();
            //     loggingIn = false;
            // })
            if(!isTeacher){
                await addStudentDoc(name, email, user.uid, onFinish)
                loggingIn = false;  
            } else {
                await addTeacherDoc(name, email, user.uid, onFinish)
                loggingIn = false;
            }
        
            
            
          }).catch((error) => {
            // An error occurred
            alert("Error when updating profile. Look in console for more info.")
            throw Error("Recieved error: " + error.message + " with error code " + error.code + " when updating profile.")
          });
       
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert("Error when registering account. Look in console for more info.")
        if(errorCode === "auth/weak-password"){
            onError("Password needs to be at least 6 characters long", "Weak Password")
        } else
        if(errorCode === "auth/email-already-in-use"){
            onError("Email already in use", "Email in use")
        } else
        if(errorCode === "auth/invalid-email"){
            onError("Invalid email", "Invalid email")
        } else {
            onError(errorMessage, errorCode)
        }
        // throw Error("Recieved error: " + errorMessage + " with error code " + errorCode + " when registering account.")
    });
    
}

export async function signIn(email: string, password: string, onError: (error: string, errorTitle: string) => void): Promise<string>{
    if(ISLOCAL){
        return authRaw.currentUserId
    }
    const auth = await getAuthReady();
    loggingIn = true;
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in successfully")
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            loggingIn = false;
            return user.uid
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Error when setting persistence. Look in console for more info.")
            throw Error("Recieved error: " + errorMessage + " with error code " + errorCode + " when setting persistence.")
        });
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === "auth/invalid-email"){
            onError("Invalid email", "Invalid email")
        } else if(errorCode === "auth/wrong-password"){
            onError("Wrong password", "Wrong password")
        } else if(errorCode === "auth/invalid-credential"){
            onError("Incorrect Email or Password", "Incorrect Sign In Details")
        }
        else {
            onError(errorMessage, errorCode)
        }
        // alert("Error when signing in. Look in console for more info.")
        // throw Error("Recieved error: " + errorMessage + " with error code " + errorCode + " when signing in.")
    });
    return ""
}

export async function signOutUser(){
    const auth = await getAuthReady();
    await signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed out successfully")
        
      }).catch((error) => {
        // An error happened.
        alert("Error when signing out. Look in console for more info.")
        throw Error("Recieved error: " + error.message + " with error code " + error.code + " when signing out.")
      });
}

export async function getUserId(): Promise<string | boolean> {
    if(ISLOCAL){
        return authRaw.currentUserId
    }
    const auth = await getAuthReady();
    //Check if logged in
    if(auth.currentUser){
        // console.log("User is logged in" + auth.currentUser.uid)
        return auth.currentUser.uid
    } else {
        // throw Error("User is not logged in" + JSON.stringify(auth))
        return false
    }

    // return false
}

// export const user = new Promise<User>((resolve, _) => {
//     const auth = getAuth();
//     let triggered = false;
//     if (auth.currentUser) {
//         resolve(auth.currentUser)
//     } else {
//         onAuthStateChanged(auth, (user) => {
//             if (user && !triggered) {
//                 triggered = true
//                 resolve(user)
//             }
//         })
//     }
// })

// type UserCallback = (user: User) => void
// export async function onLogin(callback: UserCallback) {
//     const auth = getAuth();
//     let triggered = false;
//     if (auth.currentUser) {
//         callback(auth.currentUser)
//     } else {
//         onAuthStateChanged(auth, (user) => {
//             if (user && !triggered) {
//                 triggered = true
//                 callback(user)
//             }
//         })
//     }
// }

export async function forgotPassword(email: string, onError: (error: string, errorTitle: string) => void){
    const auth = await getAuthReady();
    await sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password reset email sent")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === "auth/invalid-email"){
            onError("Invalid email", "Invalid email")
        } else if(errorCode === "auth/user-not-found"){
            onError("User not found", "User not found")
        } else {
            onError(errorMessage, errorCode)
        }
        // alert("Error when sending password reset email. Look in console for more info.")
        throw Error("Recieved error: " + errorMessage + " with error code " + errorCode + " when sending password reset email.")
    });
}

export async function resetPassword(oobCode: string, newPassword: string, onError: (error: string, errorTitle: string) => void){
    const auth = await getAuthReady();
    // Verify the password reset code is valid.
    await confirmPasswordReset(auth, oobCode, newPassword)
    .then(() => {
        // Password reset has been confirmed and new password updated.
        // alert("Password reset successfully")
        console.log("Password reset successfully")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === "auth/expired-action-code"){
            onError("Password reset link expired", "Password reset link expired")
        } else if(errorCode === "auth/invalid-action-code"){
            onError("Invalid password reset link", "Invalid password reset link")
        } else if(errorCode === "auth/user-disabled"){
            onError("User disabled", "User disabled")
        } else if(errorCode === "auth/user-not-found"){
            onError("User not found", "User not found")
        } else {
            onError(errorMessage, errorCode)
        }
        // alert("Error when resetting password. Look in console for more info.")
        // throw Error("Recieved error: " + errorMessage + " with error code " + errorCode + " when resetting password.")
    });
}