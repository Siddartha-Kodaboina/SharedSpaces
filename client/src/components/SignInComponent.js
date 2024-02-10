import React from 'react';
import { signInWithGoogle } from '../services/googleAuthService';

const SignInComponent = () => {
//   const handleSignIn = () => {
//     signInWithGoogle()
//       .then((result) => {
//         // The token you receive from the sign-in process
//         const token = result.credential.idToken;
//         console.log('token ', token);
//         // This part should be handled in authService.js but shown here for clarity
//         fetch('/api/auth/verifyToken', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ token }),
//         });
//       })
//       .catch((error) => {
//         console.error("Error during sign in: ", error);
//       });
//   };

  return (
    <div>
        {/* <h1>{process.env.REACT_APP_FIREBASE_API_KEY}</h1> */}
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    
  );
};

export default SignInComponent;
