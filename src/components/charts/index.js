"use client"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { data } from "@/helpers/chartData";

const ChartComponent = () => {
  return (
    <div>
      <ApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
        width={"100%"}
      />
    </div>
  );
};

export default ChartComponent;
