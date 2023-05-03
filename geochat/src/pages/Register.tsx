import logo from '../assets/Logo.png';
import "../index.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { auth, db, storage } from "../firbase"
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom"


function Register() {  
    const [err, setErr] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e: {
      target: any; preventDefault: () => void; }) => {
      e.preventDefault()
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];

      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
                      
          }, 
          (error) => {
            setErr(true);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL
              });

              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL
              });

              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");

            });
          }
        );
      } catch (err) {
        setErr(true);
      } 

    }
    return (
      <div className="formContainer">   
      <div className="formWrapper">
        <img src={logo} alt="GeoChat logo"></img>
        <span className="title"> Register </span>
        <form onSubmit={handleSubmit}>

        {/* <form> */}
            <input type="text" placeholder="display name"></input>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <input type="file"/>
            <button> Sign Up </button>
            { err && <span> Oops! Something went wrong </span>}
        </form> 
        <p> Already have an account? <Link to="/login"> Log In </Link> </p>
      </div>
      </div>
    )
  }

export default Register;
