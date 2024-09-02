import { axisClasses, BarChart } from "@mui/x-charts";
import * as React from "react";
import { getCountryCode, getDatasetForExpert } from "../utils/helpers";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "rotate(-90deg) translate(0px, -20px)",
    },
  },
};

// fetch successfull-calls from api
// - make an array of objs, in which key is country  and value is number success-calls that expert-Made
// sample data

// const dataset = [
//   {
//     usa: 2,
//     pakistan: 3,
//     india: 23,
//     month: 'feb'
//   }
//   {
//     usa: 0,
//     pakistan:0 ,
//     india: 0,
//     month: 'feb'
//   }
// ]

const valueFormatter = (value) =>
  `${value} ${value === 1 ? " Client" : " Clients"}`;

export default function BarsDataset() {
  const [Appointments, setAppointments] = React.useState([]);
  const [DataSet, setDataSet] = React.useState({});

  React.useEffect(() => {
    getDatasetForExpert().then((data) => {
      console.log(data, " data set");
      setDataSet(data);
    });
  }, []);

  const { countries = [], dataset = [] } = DataSet;
console.log("countries",countries)
  return (
    countries.length > 0 && dataset.length > 0 ? (
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]} 
        series={
          countries.length > 0
            ? countries.map((country) => ({
                dataKey: country,
                label: getCountryCode(country) || 'PK',
                valueFormatter,
              }))
            : []
        }
        {...chartSetting}
      />
    ) : null
    // <h1>asd</h1>
  );
}
