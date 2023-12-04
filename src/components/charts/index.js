import React from "react";
import ReactApexChart from 'react-apexcharts';
import { data } from "@/helpers/chartData";

const index = ({ height }) => {
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="line"
      height={height}
    />
  );
};

export default index;
