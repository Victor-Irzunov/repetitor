"use client"
import { DiaryTable } from "@/components/tableDiary/DiaryTable";
import fon from '../../public/images/fon_driaty.webp';
import Image from "next/image";
import { useEffect, useState } from "react";
import { dataOneUserDnevnik } from "@/http/dnevnikAPI";
import { dataUser } from "@/http/userAPI";

const DiaryPage = () => {
  const [dataDnevnik, setDataDnevnik] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dataUser();
        if (userData && userData.id) {
          const diaryData = await dataOneUserDnevnik(userData.id);
          console.log("🚀 🚀 🚀  _ file: page.js:19 _ useEffect _ res:", diaryData);
          setDataDnevnik(diaryData.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-10 min-h-screen overflow-hidden">
      <div className="container mx-auto">
        <h1 className="text-center uppercase text-3xl font-semibold bg-gradient-to-r from-cyan-500 to-green-500 text-transparent bg-clip-text">
          Дневник
        </h1>
        <DiaryTable dataDnevnik={dataDnevnik} />
        <div className="w-full mt-20 text-right">
          <div className="float-right">
            <Image src={fon} alt="Дневник ученика" width={180} className="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiaryPage;
