// src/components/DashboardCharts.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const EnrollmentChart = ({ dataFromApi }) => {
  const labels = dataFromApi?.labels || [
    "College",
    "Bachelor",
    "Postgraduate",
    "Master",
    "Doctoral",
    "Postdoctoral",
  ];

  const values = dataFromApi?.values || [320, 420, 260, 140, 90, 40];

  const data = {
    labels,
    datasets: [
      {
        label: "Enrolled",
        data: values,
        backgroundColor: "#38bdf8",
        borderRadius: 12,
        barThickness: 14,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 10 } } },
      y: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 10 } } },
    },
  };

  return <Bar data={data} options={options} />;
};

export const TraineeChart = ({ dataFromApi }) => {
  const labels = dataFromApi?.labels || [
    "8am",
    "10am",
    "12pm",
    "2pm",
    "4pm",
  ];

  const applicants = dataFromApi?.applicants || [20, 35, 40, 28, 45];
  const final = dataFromApi?.final || [15, 30, 32, 22, 38];

  const data = {
    labels,
    datasets: [
      {
        label: "Applicants",
        data: applicants,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.25)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Final Number",
        data: final,
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 10 } } },
      y: {
        grid: { color: "rgba(148,163,184,0.25)" },
        ticks: { color: "#64748b", font: { size: 10 } },
      },
    },
  };

  return <Line data={data} options={options} />;
};
