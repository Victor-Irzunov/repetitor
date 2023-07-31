"use client"
import { useEffect, useState } from "react";
import { getPayUser } from "@/http/payAPI";
import { dataUser } from "@/http/userAPI";
import MyCalendar from "@/components/сalendar/CalendarComp";
import { message } from "antd";

const PaymentPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    dataUser()
      .then((userRes) => {
        if (userRes && userRes.id) {
          getPayUser(userRes.id)
            .then((paymentData) => {
					if (paymentData) {
						message.success(paymentData.message)
						setData(paymentData.data)
					}
            })
            .catch((error) => {
              console.error("Error fetching payment data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <section className="py-10 min-h-screen overflow-hidden">
      <div className="container mx-auto">
        <h1 className="text-center mb-10 uppercase text-3xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Оплаты
        </h1>
        <MyCalendar events={data} />
      </div>
    </section>
  );
};

export default PaymentPage;
