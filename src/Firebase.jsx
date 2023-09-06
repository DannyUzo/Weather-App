import React from 'react';
import { useState, useEffect } from "react";
import { db } from "./Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";



const Firebase = () => {
 
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
  
    // const obj = {
    //   name: "",
    //   age: 0
    // }
  
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const [toggleFetch, setToggleFetch] = useState(false)
  
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    const createUser = async () => {
      await addDoc(usersCollectionRef, { name: newName, age: newAge });
      setToggleFetch((prev) => !prev)
    };
    const deleteUser = async (id) => {
      const userDoc = doc(db, "users", id);
       await deleteDoc(userDoc)
      setToggleFetch((prev) => !prev)
    };
  
    // const handleUndo = () => {
    //   return(
  
    //   )
    // };
  
  
  
    const updateUser = async (id, age) => {
      const userDoc = doc(db, "users", id);
      const newFields = { age: Number(age) + 1 };
      await updateDoc(userDoc, newFields);
      setToggleFetch((prev) => !prev)
    };
  
    useEffect(() => {
      getUsers();
    }, [toggleFetch]);
  
    

    return (
    <div>
<div className="sign-up">

<h1>Add User</h1>
<br />
<input
  type="text"
  placeholder="Name"
  onChange={(event) => {
    setNewName(event.target.value);
  }}
/>
<input
  type="number"
  placeholder="Age"
  onChange={(event) => {
    setNewAge(event.target.value);
  }}
/>
<button onClick={createUser}>Create user</button>
</div>
<div className="info-wrapper">

<h1>DATA LIST</h1>
{users.map((user, index) => {
  return (
    <div>
    <div key={index.toString()}>
      <div className="info-box">
        <h3> Name: {user.name}</h3>
        <h3>Age: {user.age} yrs old</h3>
        <button onClick={()=> deleteUser(user.id) }>Delete user</button>     
      </div>
    </div>
  </div>
  );
})}
</div>
    </div>
    );
}


export default Firebase;