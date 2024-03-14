"use client"
import { useEffect, useState } from 'react';
import {UserInterface} from "@/type/user.interface";

type Props = {
  params: {
    id: string
  }
}



export default function User({ params: { id } }: Props) {

  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetch(`http://18.197.131.200:3000/users/${id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });

    }
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Position: {user.position.name}</p>
      <p>Position ID: {user.position.id}</p>
      <img src={user.photo} alt={user.name} />
    </>
  );
}
