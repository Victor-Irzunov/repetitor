"use client"
import { LoginComponent } from "@/components/LoginRegistratComp/LoginComponent";
import { dataUser } from "@/http/userAPI";
import { useEffect, useContext } from "react";
import { MyContext } from "@/contexts/MyContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { updateState } = useContext(MyContext);
  useEffect(() => {
    dataUser()
      .then(data => {
        if (data && data?.isAdmin) {
          router.push('/admin')
          updateState(data)
        }
        if (data && !data?.isAdmin) {
          router.push('/student')
          updateState(data)
        }
      })
  }, [])

  return (
    <main className="flex min-h-screen flex-col relative items-center justify-between p-16 overflow-hidden">
      <div className='w-full h-screen fon bg-cover bg-center' />
      <LoginComponent />
    </main>
  );
}
