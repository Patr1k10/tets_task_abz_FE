"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "@/app/page.module.css";
import {AllUsersDataInterface} from "@/type/all.users.data.interface";
import {UserInterface} from "@/type/user.interface";

async function getUsers(url: string):Promise<AllUsersDataInterface>  {
  const response = await fetch(url);
  const data: AllUsersDataInterface = await response.json();
  return data;
}

export default function Users() {
  const [users , setUsers] = useState<UserInterface[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await getUsers('http://18.197.131.200:3000/users?page=1&count=6');
      setUsers(initialData.users );
      setNextUrl(initialData.links.next_url);
    };
    fetchData();
  }, []);

  const loadMoreUsers = async () => {
    if (nextUrl) {
      const data = await getUsers(nextUrl);
      setUsers([...users, ...data.users]);
      setNextUrl(data.links.next_url);
    }
  };

  return (
    <>
      <h1>Users</h1>
      <ul className={styles.ul}>
        {users.map((user) => (
          <li key={user.id} className={styles.li}>
            <Link href={`/users/${user.id}`}>
              <div>
                <img src={user.photo} className={styles.img} alt={user.name}/>
                <span className={styles.span}>{user.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {nextUrl && (
        <button onClick={loadMoreUsers}>Show more</button>
      )}
    </>
  );
}
