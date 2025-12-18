import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { report } from "../../services/api/admin/work";
import LoadingRow from "../../components/common/LoadingRow";

const Traffic = () => {
  const { workId } = useParams();

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: [], // 👈 để trống ban đầu
    },
    grid: {
      borderColor: "#8f07b5ff",
    },
    tooltip: {
      shared: true,
      intersect: false,
      color:"black"
    },
  });

  useEffect(() => {
    report(workId).then((v) => {
      setSeries(v.data); // [{ name: 'view', data: [...] }]

      setOptions((prev) => ({
        ...prev,
        xaxis: {
          categories: v.months, // 👈 6 tháng gần nhất
        },
      }));
    });
  }, [workId]);

  return (
    <>
      <p className="text-lg font-semibold mb-4 text-sky-500">
        REPORT PAGE (latest six months)
      </p>

      {series.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      ) : (
        <LoadingRow quanityRow={10} />
      )}
    </>
  );
};

export default Traffic;
