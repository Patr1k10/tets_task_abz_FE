"use client"
import { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";
import {PositionInterface} from "@/type/posirion.interface";

async function getPositions(url: string):Promise<any>  {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function Positions() {
  const [positions , setUsers] = useState<PositionInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await getPositions('http://18.197.131.200:3000/positions');
      setUsers(initialData );
    };
    fetchData();
  }, []);



  return (
    <>
      <h1>Available positions:</h1>
      <ul className={styles.ul}>
        {positions.map((position) => (
          <li key={position.id} className={styles.li}>
              <div>
                <h3 >{position.name}</h3>
              </div>
          </li>
        ))}
      </ul>
    </>
  );
}
