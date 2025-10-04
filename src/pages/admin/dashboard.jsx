import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllUsers } from '../../features/action/adminAction';
import { getActiveProducts } from '../../features/action/productAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import { clearMessage } from '../../features/slices/adminSlice';
import Loader from '../../component/common/loader';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCategories());
    dispatch(getActiveProducts());
  }, [dispatch]);

  
  const { categories, users, products, message, messageType, loading } = useSelector((state) => state.admin);
  useEffect(() => {
    
    if (messageType == 0) {
      console.log(message);
      handleError(message);
    }
if(message!== null){
 dispatch(clearMessage())
}
  }, [message, messageType, clearMessage]);


  // ✅ Helper: get week number from date
  const getWeekNumber = (dateStr) => {
    const date = new Date(dateStr);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - startOfYear) / 86400000;
    return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  };

  // ✅ Group items by week
  const groupByWeek = (items) => {
    const counts = {};
    items.forEach((item) => {
      if (!item?.createdAt) return; // skip if missing
      const week = getWeekNumber(item.createdAt);
      counts[week] = (counts[week] || 0) + 1;
    });
    return counts;
  };

  const userCounts = groupByWeek(users);
  const productCounts = groupByWeek(products);

  // ✅ Collect all unique weeks (sorted)
  const allWeeks = Array.from(
    new Set([...Object.keys(userCounts), ...Object.keys(productCounts)])
  ).sort((a, b) => a - b);

  const labels = allWeeks.map((w) => `Week ${w}`);

  // ✅ Build datasets dynamically
  const data = {
    labels,
    datasets: [
      {
        label: "User Signups",
        data: allWeeks.map((w) => userCounts[w] || 0),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Products Added",
        data: allWeeks.map((w) => productCounts[w] || 0),
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
        text: "Weekly Users & Products",
      },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      {loading && <Loader/>}
      <p className="py-5 text-xl font-medium">Overview</p>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-3">
        <div className="text-center w-[80%] h-[30vh] border-1 hover:border-black animate-pulse translate-y-5 hover:bg-blue-300 transform transition-all ease-in-out delay-200 duration-200 border-gray-300 flex flex-col items-center justify-center rounded shadow-xl text-white bg-red-500">
          <p>Active Products</p>
          <p className="text-lg font-medium underline">{products.length}</p>
        </div>
        <div className="text-center w-[80%] h-[30vh] border-1 hover:border-black animate-pulse translate-y-5 hover:bg-blue-300 transform transition-all ease-in-out delay-200 duration-200 border-gray-300 flex flex-col items-center justify-center rounded shadow-xl text-white bg-green-500">
          <p>All Categories</p>
          <p className="text-lg font-medium underline">{categories.length}</p>
        </div>
        <div className="text-center w-[80%] h-[30vh] border-1 hover:border-black animate-pulse translate-y-5 hover:bg-blue-300 transform transition-all ease-in-out delay-200 duration-200 border-gray-300 flex flex-col items-center justify-center rounded shadow-xl text-white bg-blue-500">
          <p>Total Users</p>
          <p className="text-lg font-medium underline">{users.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-[100%] h-[350px] grid grid-cols-1 place-items-center">
        <Line className="min-h-[300px]" data={data} options={options} />
      </div>
    </div>
  );
}
