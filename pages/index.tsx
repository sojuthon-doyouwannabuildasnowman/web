import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [csrData, setCsrData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setCsrData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return <div>1: {csrData?.data}</div>;
}

// export async function getServerSideProps() {
//   const res = await fetch(
//     // "https://doyouwannabuildasnowman.vercel.app/api/hello"
//     "http://localhost:3000/api/hello"
//   );
//   const ssrData = await res.json();
//   return {
//     props: {
//       ssrData,
//     },
//   };
// }
