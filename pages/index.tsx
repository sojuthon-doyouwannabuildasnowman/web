import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ ssrData }: { ssrData: any }) {
  const [csrData, setCsrData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  // test

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
  if (!ssrData) return <p>No profile data</p>;

  return (
    <div>
      1: {csrData?.name}
      <br />
      2: {ssrData?.name}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://web-omega-one.vercel.app/api/hello");
  const ssrData = await res.json();
  return {
    props: {
      ssrData,
    },
  };
}
