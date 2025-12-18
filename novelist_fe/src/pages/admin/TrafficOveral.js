import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Top100Svg from "../../components/common/Top";
import { getTopTenView } from "../../services/api/user/Ranking";
import StoryCard from "../../components/user/story/StoryCard";

const TrafficOveral = () => {
  const options = {
  chart: {
    type: "bar",
    height: 430,
    toolbar: { show: false }
  },

  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: "top"
      },
      borderRadius: 6, // bo góc đẹp hơn (optional)
      barHeight: "60%"
    }
  },

  grid: {
    show: false,        // 🔥 TẮT TOÀN BỘ GRID
  },

  stroke: {
    show: false        // 🔥 Không viền bar
  },

  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: "12px",
      colors: ["#fff"]
    }
  },

  tooltip: {
    shared: true,
    intersect: false
  },

  xaxis: {
    categories: ["Muc Than Ky", "Van Tham Bat Tri Mong", "Muc Than Ky", "Muc Than Ky", "Muc Than Ky", "Muc Than Ky"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: "#aaa"
      }
    }
  },

  yaxis: {
    labels: {
      style: {
        colors: "#aaa"
      }
    }
  },

  colors: [
    "rgba(46, 230, 166, 0.85)", // Actual
    "rgba(90, 171, 205, 0.85)"  // Expected
  ],

  fill: {
    opacity: 0.85
  }
};


  const series = [
    {
      name: "Actual",
      data: [12, 44, 54, 66, 81, 67]
    },
    {
      name: "Expected",
      data: [14, 54, 52, 65, 66, 70]
    }
  ];

  return (
    <div className=" p-4 rounded-lg">
        <div className="flex justify-center item-center"><Top100Svg  /> </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={430}
      /> 
      
       <div className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid gap-5">
            <TopTenView/>
        </div>
      <TrafficPolarArea/>
    </div>
  );
};

const TopTenView=()=>{
    const [topTenView,setTopTenView]=useState([])
    useEffect(()=>{
        getTopTenView().then(v=>{
            setTopTenView(v)
        })
    },[])
    return <>
        {topTenView.map(v=><StoryCard story={v}/>)}
    </>
}

const TrafficPolarArea = () => {
  const series = [14, 23, 21, 17, 15, 10, 12, 17, 21];

  const options = {
    chart: {
      type: "polarArea",
      toolbar: { show: false }
    },

    stroke: {
      colors: ["#ffffff"] // viền trắng giữa các sector
    },

    fill: {
      opacity: 0.8
    },

    labels: [
      "Direct",
      "Social",
      "Email",
      "Ads",
      "Referral",
      "Organic",
      "Push",
      "Other",
      "Unknown"
    ],

    legend: {
      position: "right",
      labels: {
        colors: "#aaa"
      }
    },

    theme: {
      mode: "dark" // nếu dashboard dark
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 220
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  return (
    <div className="p-4 rounded-xl bg-white/5">
      <h3 className="text-sm text-gray-300 mb-3">
        Standout Type Of Work
      </h3>

      <ReactApexChart
        options={options}
        series={series}
        type="polarArea"
        height={320}
      />
    </div>
  );
};

export default TrafficOveral;
