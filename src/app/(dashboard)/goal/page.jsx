"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useSorting from "@/app/hooks/useSorting";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { formatDate } from "@/helpers/helper";
import { goalServices } from "@/services/goal.services";
import { convertNumberToCurrencyFormat } from "@/helpers/helper";
import { images } from "next.config";

const GoalPage = () => {
  const router = useRouter();

  const [goalData, setGoalData] = useState([]);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  useEffect(() => {
    // Fetch goal data and update the state
    goalServices
      .getGoalData()
      .then((data) => {
        setGoalData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching goal data:", error);
      });
  }, []);

  const showDeleteConfirmation = () => {
    setDeleteConfirmationVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleDelete = (id) => {
    (async () => {
      try {
        const res = await goalServices.deleteGoalData(id);
        if (res.success) {
          window.location.reload();
          hideDeleteConfirmation();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <div className="pt-4 pb-24">
      <div className="bg-white min-w-screen py-4 flex items-center justify-between">
        <h1 className="font-bold text-[32px] text-black ml-8">Goal</h1>
        <div className="flex space-x-4 mr-20">
          <button
            className="rounded-full text-white px-8 py-2 bg-main hover:bg-main-hover active:bg-main-active "
            onClick={() => router.push("/goal/create")}
          >
            Create
          </button>
        </div>
      </div >

      <div>
      {goalData.map((goal) => ( 
       <div className="bg-white mt-10 mb-10 rounded-xl mx-20 py-10 flex items-center justify-between"> 
         <div key={goal._id} className="flex items-center ml-10 mr-10 ">
         <img src={goal.goalImage} style={{ width: '200px', height: '200px' }} alt="Goal" />
             <div className="ml-10 mt-0">
               <h1 className="font-bold text-[30px] text-black">{goal.goalName}</h1>
               <p className="font-semibold text-[20px] text-black">Description<br></br><span className="text-[15px] text-black">{goal.goalDescription}</span></p>
               <p className="font-semibold text-[20px] text-black ">Price<br></br><span className="text-red-500">Rp{goal.goalAmount}</span></p>
               <p className="font-semibold text-[20px] text-black">Store <br></br><span className="text-black">{goal.goalStore}</span></p>
             </div>
         </div>
         <div className="mr-20">
           <h1 className="font-bold text-[20px] text-black mb-5">Saving Amount<br></br>Rp{goal.goalsavingsAmount}</h1>
           <div className="flex items-center">
            <div className="font-bold text-[40px] grid w-32 h-32 bg-base-300 rounded-xl place-items-center"> {goal.goalsavingsAmount}% </div>
            <div className="flex flex-col justify-center items-center ml-4">
              <button>
                <Image width={50} height={50} src="/assets/Edit1.png" alt="Edit" />
              </button>
              <div className="mt-2"> {/* Add a margin-top for the desired gap */}
                <button onClick={showDeleteConfirmation}>
                  <Image width={50} height={50} src="/assets/Delete1.png" alt="Delete" />
                </button>
              </div>
            </div>
          </div>
          <DeleteConfirmation
          isOpen={isDeleteConfirmationVisible}
          hideDeleteConfirmation={hideDeleteConfirmation}
          handleDelete={() => handleDelete_id}
          />
         </div>
       </div>
      ))}

      </div>
  </div>
  );
};

export default GoalPage;
