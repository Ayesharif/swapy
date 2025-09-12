import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Dashboard() {

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const data = {
    labels,
    datasets: [
      {
        label: "User Signups",
        data: [25, 20, 35, 50], // weekly data for users
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // smooth line
      },
      {
        label: "Products Added",
        data: [10, 30, 50, 20], // weekly data for products
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Users & Products (August 2025)",
      },
    },
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className='py-5 text-xl font-medium'>Overview</p>
      <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-3'>

      <div className='text-center w-[80%] h-[30vh] border-1 hover:border-black animate-pulse  translate-y-5 hover:bg-blue-300 hover: transform transition-all ease-in-out delay-200 duration-200  border-gray-300 flex flex-col items-center justify-center rounded shadow-xl text-white bg-red-500'>
        <p>Active Products</p>
        <p className='text-lg font-medium underline'>125</p>
      </div>
      <div className='text-center w-[80%] h-[30vh] border-1 hover:border-black animate-pulse  translate-y-5 hover:bg-blue-300 hover: transform transition-all ease-in-out delay-200 duration-200  border-gray-300 flex flex-col items-center justify-center rounded shadow-xl text-white bg-green-500'>
        <p>All Categories</p>
        <p className='text-lg font-medium underline'>20</p>
      </div>
      <div className='text-center w-[80%] h-[30vh] border-1 hover:border-black animate-pulse  translate-y-5 hover:bg-blue-300 hover: transform transition-all ease-in-out delay-200 duration-200  border-gray-300 flex flex-col items-center justify-center rounded shadow-xl text-white bg-blue-500'>
        <p>Total Users</p>
        <p className='text-lg font-medium underline'>230</p>
      </div>
      </div>
<div className='w-[100%] h-[350px] grid grid-cols-1 place-items-center'>
  <Line className='min-h-[300px] ' data={data} options={options} />
  <Line className='min-h-[300px] ' data={data} options={options} />
</div>

    </div>
  )
}
