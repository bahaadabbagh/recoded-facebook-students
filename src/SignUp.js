import React, { useState } from "react";
import firebase from "firebase";
import db from "./firebase";
import image from "./google-signin.png";

const SignUpPage = () => {
   const [userName, setUserName]= useState('');
   const [userPhotoUrl, setUserPhotoUrl] = useState('');
   const [userCity,setUserCity]= useState('');
   const [userProfile, setUserProfile]= useState('');
   const [myUserId, setMyUserId]= useState('')
const loginhandler=()=>{
  let  provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    setUserName(user.displayName);
    setMyUserId (user.uid);
    setUserPhotoUrl(user.photoURL)
    // console.log(myUserId)
    console.log(myUserId)
    console.log(userPhotoUrl)
    console.log(userName)
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });}
  const handleCity = (e)=>{
    // console.log(e.target.value)
    setUserCity(e.target.vlaue)
    // console.log(userCity)
  }
  const handleProfile = (e)=>{
    // userProfile.push(e.target.vlaue)
    setUserProfile(e.target.value)
  }
  const handleSubmit=async(e)=>{
  e.preventDefault();
    db.collection('profiles').doc(myUserId).add({
      userName: userName,
      imageUrl: userPhotoUrl,
      city: userCity,
      userId:myUserId,
      profile: userProfile,
    })
    console.log("hola")
  }
  return <form onSubmit={handleSubmit}>
   <img src={image} alt="test" onClick={loginhandler}></img>
    <input type="text" placeholder="city" onChange={handleCity}></input>
    <input type="text" placeholder="Profile" onChange={handleProfile}></input>
    <button type="submit">Submit</button>
  </form>;
};

export default SignUpPage;
