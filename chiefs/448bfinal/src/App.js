import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { gsap } from "gsap";
import { motion } from "framer-motion";
import "./App.css";

import mahomesImg from "./images/mahomes.png";
import staffordImg from "./images/stafford.png";
import goffImg from "./images/goff.png";
import purdyImg from "./images/purdy.png";
import footballImg from "./images/football.png";
import burrowImg from "./images/burrow.png";
import allenImg from "./images/allen.png";
import bradyImg from "./images/brady.png";

import { Trophy, TrendingUp, Flag, Activity } from "lucide-react";
import { Star, Crown } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [showChart, setShowChart] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trivia, setTrivia] = useState("");
  const [loading, setLoading] = useState(false);
  const [rightScrollProgress, setRightScrollProgress] = useState(0);
  const rightSectionRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("");
  const aboutSectionRef = useRef(null);
  const [selectedQB, setSelectedQB] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("yardage");
  const [selectedSeason, setSelectedSeason] = useState(2023);

  const qbData = [
    {
      name: "Patrick Mahomes",
      image: mahomesImg,
      playoffYards: 283,
      season: 2020,
      completion: "64.9%",
      touchdowns: "1.33",
      interceptions: "0.67",
    },
    {
      name: "Tom Brady",
      image: bradyImg,
      playoffYards: 265,
      season: 2020,
      completion: "58.6%",
      touchdowns: "2.5",
      interceptions: "0.75",
    },
    {
      name: "Josh Allen",
      image: allenImg,
      playoffYards: 272,
      season: 2020,
      completion: "64.17%",
      touchdowns: "1.67",
      interceptions: "0.33",
    },
    {
      name: "Patrick Mahomes",
      image: mahomesImg,
      playoffYards: 350,
      season: 2023,
      completion: "69.7%",
      touchdowns: "1.5",
      interceptions: "0.25",
    },
    {
      name: "Patrick Mahomes",
      image: mahomesImg,
      playoffYards: 352,
      season: 2021,
      completion: "72.9%",
      touchdowns: "3.67",
      interceptions: "1",
    },
    {
      name: "Matthew Stafford",
      image: staffordImg,
      playoffYards: 297,
      season: 2021,
      completion: "70%",
      touchdowns: "2.25",
      interceptions: "0.75",
    },
    {
      name: "Joe Burrow",
      playoffYards: 276,
      image: burrowImg,
      season: 2021,
      completion: "68.3%",
      touchdowns: "1.25",
      interceptions: "0.5",
    },
    {
      name: "Jared Goff",
      image: goffImg,
      playoffYards: 385,
      season: 2023,
      completion: "69.3%",
      touchdowns: "1.33",
      interceptions: "0",
    },
    {
      name: "Brock Purdy",
      playoffYards: 774 / 3,
      image: purdyImg,
      season: 2023,
      completion: "61.1%",
      touchdowns: "1",
      interceptions: "0.33",
    },
  ];

  const getFootballPosition = (yards) => {
    const maxYards = 500; // Maximum yardage displayed
    const containerWidth = 800; // Width of the visual container (adjust as needed)

    // Scale yards proportionally to the container width
    return (yards / maxYards) * containerWidth;
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupText("");
  };

  useEffect(() => {
    const handleRightScroll = () => {
      const rightSection = rightSectionRef.current;
      if (!rightSection) return;

      const rect = rightSection.getBoundingClientRect();
      const sectionHeight = rightSection.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(
          1,
          1 - (rect.top - viewportHeight * 0.25) / (sectionHeight * 0.5)
        )
      );

      setRightScrollProgress(progress);
    };

    window.addEventListener("scroll", handleRightScroll);
    handleRightScroll();
    return () => window.removeEventListener("scroll", handleRightScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = aboutSectionRef.current;
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      const sectionHeight = aboutSection.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(
          1,
          1 - (rect.top - viewportHeight * 0.25) / (sectionHeight * 0.5)
        )
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const facts = [
    "The Kansas City Chiefs were founded in 1960 as the Dallas Texans.",
    "The Chiefs won their first Super Bowl in 1970, led by coach Hank Stram.",
    "Arrowhead Stadium, the Chiefs' home, is one of the loudest stadiums in the NFL.",
    "Patrick Mahomes became the youngest quarterback to win Super Bowl MVP in 2020.",
    "The Chiefs have one of the longest streaks of sell-out games in NFL history.",
  ];

  const fetchTrivia = () => {
    setLoading(true);
    setTrivia("");
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setTrivia(facts[randomIndex]);
      setLoading(false);
    }, 1000);
  };

  const handleBegin = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowChart(true);
      },
    });
  };

  const aggregatedData = [
    { team: "ARI", yardage: 38995, penalties: 106, twoPointConversions: 14 },
    { team: "ATL", yardage: 39473, penalties: 90, twoPointConversions: 5 },
    { team: "BAL", yardage: 39515, penalties: 96, twoPointConversions: 3 },
    { team: "BUF", yardage: 39379, penalties: 89, twoPointConversions: 4 },
    { team: "CAR", yardage: 41349, penalties: 108, twoPointConversions: 5 },
    { team: "KC", yardage: 38163, penalties: 96, twoPointConversions: 3 },
    { team: "CIN", yardage: 40251, penalties: 102, twoPointConversions: 6 },
    { team: "CLE", yardage: 39950, penalties: 110, twoPointConversions: 2 },
    { team: "DAL", yardage: 40600, penalties: 93, twoPointConversions: 4 },
    { team: "DEN", yardage: 38700, penalties: 94, twoPointConversions: 5 },
    { team: "DET", yardage: 40450, penalties: 91, twoPointConversions: 7 },
    { team: "GB", yardage: 39500, penalties: 90, twoPointConversions: 3 },
    { team: "HOU", yardage: 39700, penalties: 88, twoPointConversions: 3 },
    { team: "IND", yardage: 40000, penalties: 95, twoPointConversions: 4 },
    { team: "JAC", yardage: 39200, penalties: 89, twoPointConversions: 5 },
    { team: "LA", yardage: 38950, penalties: 104, twoPointConversions: 2 },
    { team: "LAC", yardage: 39850, penalties: 98, twoPointConversions: 3 },
    { team: "MIN", yardage: 40500, penalties: 107, twoPointConversions: 4 },
    { team: "NE", yardage: 39230, penalties: 103, twoPointConversions: 2 },
    { team: "NO", yardage: 40300, penalties: 100, twoPointConversions: 6 },
    { team: "NYG", yardage: 38500, penalties: 92, twoPointConversions: 3 },
    { team: "NYJ", yardage: 39000, penalties: 98, twoPointConversions: 4 },
    { team: "LV", yardage: 40050, penalties: 95, twoPointConversions: 5 },
    { team: "PHI", yardage: 42000, penalties: 105, twoPointConversions: 4 },
    { team: "PIT", yardage: 39210, penalties: 101, twoPointConversions: 3 },
    { team: "SEA", yardage: 40900, penalties: 90, twoPointConversions: 6 },
    { team: "SF", yardage: 41500, penalties: 94, twoPointConversions: 5 },
    { team: "TB", yardage: 38750, penalties: 100, twoPointConversions: 3 },
    { team: "TEN", yardage: 39300, penalties: 99, twoPointConversions: 4 },
    { team: "WAS", yardage: 39600, penalties: 102, twoPointConversions: 5 },
  ];

  const chartData = {
    labels: aggregatedData.map((row) => row.team),
    datasets: [
      {
        label: selectedMetric,
        data: aggregatedData.map((row) => row[selectedMetric]),
        backgroundColor: aggregatedData.map((row) =>
          row.team === "KC"
            ? "rgba(255, 99, 132, 0.6)"
            : "rgba(75, 192, 192, 0.2)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: { maxRotation: 0, minRotation: 0 },
      },
      y: {
        beginAtZero: true,
        grace: "5%",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-red-600 text-white ">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Chiefs Nation</h1>
          <nav className="flex space-x-6">
            <a
              href="https://www.chiefs.com/team/players-roster"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              Roster
            </a>

            <a
              href="https://www.chiefs.com/schedule/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              Schedule
            </a>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <div
        ref={containerRef}
        className="welcome-section relative min-h-screen flex flex-col items-center justify-center p-4 pt-24"
        style={{
          backgroundImage: `
      linear-gradient(to bottom, 
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(180, 30, 30, 0.3) 100%
      ),
      url(${require("./images/field.jpg")})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6">
          <h1 className="text-5xl font-bold text-red-600 text-center mb-6">
            Welcome to Chiefs Nation
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg shadow-sm">
              <Trophy className="w-12 h-12 text-red-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-800">3x Champions</h3>
              <p className="text-center text-gray-600 text-sm">
                Super Bowl Victories since 2020
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg shadow-sm">
              <Crown className="w-12 h-12 text-red-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-800">
                Patrick Mahomes
              </h3>
              <p className="text-center text-gray-600 text-sm">2x NFL MVP</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg shadow-sm">
              <Star className="w-12 h-12 text-red-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-800">8 Straight</h3>
              <p className="text-center text-gray-600 text-sm">
                Division Championships
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Dynasty in the Making
            </h2>
            <p className="text-gray-600">
              Experience the excitement of Chiefs Kingdom, where tradition meets
              excellence. Led by Patrick Mahomes and coached by Andy Reid,
              they're writing NFL history.
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
            >
              Explore Their Journey
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        ref={aboutSectionRef}
        className="relative h-screen flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-red-900"
      >
        <div
          className="sticky left-0 top-0 h-screen bg-red-600 transition-all duration-1000 ease-in-out"
          style={{
            width: "50%",
            transform: `translateX(${-100 * (1 - scrollProgress)}%)`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-1000"
            style={{ opacity: scrollProgress }}
          >
            <h2 className="text-white text-6xl font-bold mb-8 whitespace-nowrap">
              About the Chiefs
            </h2>
          </div>
        </div>

        <div className="w-1/2 ml-auto p-12">
          <div
            className="space-y-8 transition-all duration-1000 delay-500"
            style={{
              opacity: scrollProgress,
              transform: `translateX(${50 * (1 - scrollProgress)}px)`,
            }}
          >
            <div className="prose prose-lg">
              <p className="text-white text-lg leading-relaxed">
                The Kansas City Chiefs are a professional football team with a
                rich history and a strong tradition of excellence. Established
                in 1960, the Chiefs are a cornerstone of the NFL, known for
                their passionate fan base, electrifying gameplay, and commitment
                to community. The team boasts a legacy of championship success,
                including multiple Super Bowl victories, and features some of
                the league's most iconic players and coaches. Based in Kansas
                City, Missouri, the Chiefs bring energy and pride to the field
                every game day, uniting fans across the nation in their pursuit
                of greatness.
              </p>
            </div>

            {/* Trivia Section */}
            <div className="w-full flex flex-col items-center">
              <button
                onClick={fetchTrivia}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors duration-200 hover:scale-105 transform"
                disabled={loading}
              >
                Press for fun fact!
              </button>

              {loading && (
                <div className="w-8 h-8 mt-4 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              )}

              {!loading && trivia && (
                <div className="w-full mt-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300">
                  <p className="text-lg text-white">{trivia}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trophy Section */}
      <div className="relative min-h-screen bg-gradient-to-b from-red-900 to-gray-900 flex">
        <div className="w-1/2 h-screen flex items-center justify-center p-8">
          <div className="max-w-xl text-center">
            <div className="flex justify-center items-center gap-4 mb-12 transform hover:scale-105 transition-transform">
              {[1, 2, 3].map((index) => (
                <div key={index} className="relative group">
                  <img
                    src={require("./images/trophy.png")}
                    alt="Super Bowl Trophy"
                    className="w-32 h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
                </div>
              ))}
            </div>
            <p className="text-white text-xl mb-8 mx-auto max-w-prose leading-relaxed">
              The Chiefs have claimed three Super Bowl championships since 2020,
              cementing their place as one of the NFL's most dominant teams.
            </p>
            <p className="text-white text-2xl font-bold mt-8 mx-auto max-w-prose">
              What makes them so successful in recent years?
            </p>
          </div>
        </div>

        <div
          ref={rightSectionRef}
          className="relative w-1/2 h-screen flex items-center justify-center min-h-screen"
        >
          <div
            className="sticky right-0 top-0 h-screen bg-red-600 transition-all duration-1000 ease-in-out"
            style={{
              width: "100%",
              transform: `translateX(${100 * (1 - rightScrollProgress)}%)`,
            }}
          >
            <div
              className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-1000"
              style={{ opacity: rightScrollProgress }}
            >
              <h2 className="text-white text-6xl font-bold mb-8 whitespace-nowrap">
                Championship Legacy
              </h2>
            </div>
          </div>
        </div>

        {/* Scroll Arrow  */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
          onClick={() => {
            const chartSection = document.querySelector("#chart-section");
            if (chartSection) {
              chartSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div
        ref={contentRef}
        className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-900 py-8 transition-all duration-1000"
        id="chart-section"
      >
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl transition-all duration-300">
            <div className="p-4 border-b border-gray-200">
              <div className="text-2xl font-bold text-red-600 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Chiefs Performance Analysis in 2023
              </div>
            </div>
            <div className="p-4">
              {/* Metric Selection Tabs */}
              <div className="flex space-x-2 mb-4">
                {[
                  {
                    value: "yardage",
                    label: "Total Yardage",
                    icon: <TrendingUp className="w-5 h-5" />,
                  },
                  {
                    value: "penalties",
                    label: "Penalties",
                    icon: <Flag className="w-5 h-5" />,
                  },
                  {
                    value: "twoPointConversions",
                    label: "2-Point Conversions",
                    icon: <Trophy className="w-5 h-5" />,
                  },
                ].map((metric) => (
                  <button
                    key={metric.value}
                    onClick={() => setSelectedMetric(metric.value)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                      selectedMetric === metric.value
                        ? "bg-red-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {metric.icon}
                    {metric.label}
                  </button>
                ))}
              </div>

              {/* Metric Content */}
              {(() => {
                const metricInfo = {
                  yardage: {
                    title: "Total Yardage",
                    description:
                      "Lower yardage with higher wins indicates offensive efficiency",
                    format: (value) => `${value.toLocaleString()} yards`,
                  },
                  penalties: {
                    title: "Penalties",
                    description: "Fewer penalties show disciplined gameplay",
                    format: (value) => `${value} penalties`,
                  },
                  twoPointConversions: {
                    title: "2-Point Conversions",
                    description: "Strategic scoring decisions",
                    format: (value) => `${value} conversions`,
                  },
                };

                const currentMetricInfo = metricInfo[selectedMetric];
                const chiefsData = aggregatedData.find(
                  (team) => team.team === "KC"
                );
                const sortedTeams = [...aggregatedData].sort(
                  (a, b) => b[selectedMetric] - a[selectedMetric]
                );
                const rank =
                  sortedTeams.findIndex((team) => team.team === "KC") + 1;
                const leagueAvg =
                  aggregatedData.reduce(
                    (sum, team) => sum + team[selectedMetric],
                    0
                  ) / aggregatedData.length;
                const percentDiff =
                  ((chiefsData[selectedMetric] - leagueAvg) / leagueAvg) * 100;

                return (
                  <>
                    <div className="grid md:grid-cols-3 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-red-100 shadow-sm transition-all duration-300 hover:shadow-md">
                        <p className="text-sm font-medium text-gray-600">
                          Chiefs {currentMetricInfo.title}
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          {currentMetricInfo.format(chiefsData[selectedMetric])}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-red-100 shadow-sm transition-all duration-300 hover:shadow-md">
                        <p className="text-sm font-medium text-gray-600">
                          League Rank
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          #{rank} of 32
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-red-100 shadow-sm transition-all duration-300 hover:shadow-md">
                        <p className="text-sm font-medium text-gray-600">
                          vs League Average
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            percentDiff > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {percentDiff > 0 ? "+" : ""}
                          {percentDiff.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-gray-700 text-sm">
                        {currentMetricInfo.description}
                      </p>
                    </div>
                    <div className="h-[300px]">
                      <Bar
                        data={{
                          labels: aggregatedData.map((row) => row.team),
                          datasets: [
                            {
                              label: currentMetricInfo.title,
                              data: aggregatedData.map(
                                (row) => row[selectedMetric]
                              ),
                              backgroundColor: aggregatedData.map((row) =>
                                row.team === "KC"
                                  ? "rgba(220, 38, 38, 0.8)"
                                  : "rgba(203, 213, 225, 0.6)"
                              ),
                              borderColor: aggregatedData.map((row) =>
                                row.team === "KC"
                                  ? "rgb(185, 28, 28)"
                                  : "rgb(148, 163, 184)"
                              ),
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                            tooltip: {
                              callbacks: {
                                label: (context) => {
                                  return currentMetricInfo.format(context.raw);
                                },
                              },
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: "rgba(203, 213, 225, 0.2)",
                              },
                              title: {
                                display: true,
                                text: currentMetricInfo.title,
                                color: "rgb(75, 85, 99)",
                                font: {
                                  weight: "bold",
                                },
                              },
                            },
                            x: {
                              grid: {
                                display: false,
                              },
                              title: {
                                display: true,
                                text: "NFL Teams",
                                color: "rgb(75, 85, 99)",
                                font: {
                                  weight: "bold",
                                },
                              },
                            },
                          },
                        }}
                      />
                    </div>

                    <div className="mt-8 space-y-4 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800">
                        Understanding the Chiefs' Efficiency
                      </h3>

                      <div className="space-y-4 text-gray-700">
                        <p>
                          The Kansas City Chiefs rank{" "}
                          <span className="font-semibold text-red-600">
                            #30 in total yardage
                          </span>
                          , yet they're one of the NFL's most successful teams.
                          This seemingly contradictory stat actually
                          demonstrates their exceptional offensive efficiency.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-800">
                              Why Lower Yardage Can Be Better
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                Shorter fields due to strong defensive
                                performances
                              </li>
                              <li>
                                Efficient red zone scoring (fewer yards needed)
                              </li>
                              <li>
                                Strategic ball control reducing unnecessary
                                plays
                              </li>
                              <li>
                                Better starting field position from special
                                teams
                              </li>
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-800">
                              Chiefs' Offensive Success Indicators
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>High points per drive ratio</li>
                              <li>Superior red zone touchdown percentage</li>
                              <li>Fewer plays needed to score</li>
                              <li>Better third-down conversion rate</li>
                            </ul>
                          </div>
                        </div>

                        <p className="mt-4 text-sm bg-red-50 p-4 rounded-lg border border-red-100">
                          <span className="font-semibold">Key Insight:</span>{" "}
                          While many teams accumulate more total yards, the
                          Chiefs' efficiency in converting opportunities into
                          points demonstrates that quality of plays matters more
                          than quantity. Their strategic approach under Andy
                          Reid and Patrick Mahomes focuses on maximizing each
                          possession rather than accumulating raw yardage stats.
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/*
      {/* Football Grid Section }
      <div className="relative h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-4xl font-bold text-center mt-12 mb-6">
          Click on a football to view their stats!
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() =>
                  handleFootballClick(`This is football #${index + 1}.`)
                }
              >
                <img
                  src={require("./images/football.png")}
                  alt={`Football ${index + 1}`}
                  className="w-24 h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            ))}
        </div>
      </div>

      */}

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-12 w-96 h-80 rounded-lg shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-black text-lg font-bold"
            >
              &times;
            </button>
            <p className="text-lg">{popupText}</p>
          </div>
        </div>
      )}
      {/* Play Analysis Section with Transition */}
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-red-900 py-12 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-white mb-4">
              Offensive Strategy Breakdown
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Understanding the Chiefs' Dominant Offensive Scheme
            </p>
            <div className="w-32 h-1 bg-red-500 mx-auto rounded-full mb-8" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Formation Distribution */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-white">
                    Formation Usage
                  </h3>
                </div>
                <div className="h-[300px] relative">
                  <Bar
                    data={{
                      labels: ["Shotgun", "No Huddle", "Standard"],
                      datasets: [
                        {
                          data: [65, 20, 15],
                          backgroundColor: [
                            "rgba(220, 38, 38, 0.8)",
                            "rgba(59, 130, 246, 0.8)",
                            "rgba(132, 204, 22, 0.8)",
                          ],
                          borderColor: [
                            "rgb(239, 68, 68)",
                            "rgb(59, 130, 246)",
                            "rgb(132, 204, 22)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.raw}% of plays`,
                          },
                        },
                        title: {
                          display: true,
                          text: "Percentage of Each Type of Play (%)",
                          color: "rgba(255, 255, 255, 0.8)",
                          font: {
                            size: 12,
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          grid: {
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                          ticks: {
                            color: "rgba(255, 255, 255, 0.8)",
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                          ticks: {
                            color: "rgba(255, 255, 255, 0.8)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Success Analysis */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-white">
                    Formation Success Rates
                  </h3>
                </div>
                <div className="h-[300px] relative">
                  <Bar
                    data={{
                      labels: ["Shotgun", "No Huddle", "Standard"],
                      datasets: [
                        {
                          label: "Successful Plays",
                          data: [42, 15, 12],
                          backgroundColor: "rgba(34, 197, 94, 0.8)",
                          borderColor: "rgb(34, 197, 94)",
                          borderWidth: 1,
                        },
                        {
                          label: "Unsuccessful Plays",
                          data: [23, 5, 3],
                          backgroundColor: "rgba(239, 68, 68, 0.8)",
                          borderColor: "rgb(239, 68, 68)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: {
                            color: "rgba(255, 255, 255, 0.8)",
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.raw} plays`,
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                          ticks: {
                            color: "rgba(255, 255, 255, 0.8)",
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                          ticks: {
                            color: "rgba(255, 255, 255, 0.8)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
                <Star className="w-8 h-8 text-red-500 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-3">
                  Mahomes Magic
                </h4>
                <p className="text-gray-300">
                  Under Patrick Mahomes' leadership, the shotgun formation
                  becomes a lethal weapon, allowing for quick reads and
                  explosive plays that keep defenses guessing.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
                <Crown className="w-8 h-8 text-red-500 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-3">
                  Andy Reid's Innovation
                </h4>
                <p className="text-gray-300">
                  Coach Reid's creative play-calling and formation variations
                  have revolutionized the NFL, making the Chiefs' offense one of
                  the most unpredictable in the league.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
                <Trophy className="w-8 h-8 text-red-500 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-3">
                  Championship DNA
                </h4>
                <p className="text-gray-300">
                  The Chiefs' formation versatility and high success rates
                  across different setups showcase why they've dominated the AFC
                  and secured multiple Super Bowl victories.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-red-500/20">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-red-500" />
                The Chiefs' Advantage
              </h4>
              <p className="text-gray-300 mb-4">
                The data reveals the Chiefs' masterful use of different
                formations, with a clear emphasis on the shotgun formation that
                maximizes Patrick Mahomes' ability to read defenses and make
                split-second decisions. This strategic approach, combined with
                Andy Reid's innovative play-calling, creates a offense that's
                both efficient and unpredictable.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    League-leading success rate in shotgun formations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    Effective no-huddle offense for tempo control
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    Strategic formation mixing keeps defenses off-balance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    High conversion rates across all formations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transition to QB Stats Section */}
          <div className="mt-16 relative">
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10 w-full">
              <div className="bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-full opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* QB Comparison */}
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-red-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-white mb-4">
              Playoff Quarterback Stats
            </h2>
            <p className="text-xl text-gray-300 mb-8 items-center">
              Click on a quarterback to see their playoff performance in the
              corresponding year.
            </p>
            {/* Season Selector */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedSeason(2020)}
                className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                  selectedSeason === 2020
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                2020
              </button>
              <button
                onClick={() => setSelectedSeason(2021)}
                className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                  selectedSeason === 2021
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                2021
              </button>

              <button
                onClick={() => setSelectedSeason(2023)}
                className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                  selectedSeason === 2023
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                2023
              </button>
            </div>
            <div className="w-32 h-1 bg-red-500 mx-auto rounded-full mb-8" />
          </div>

          <div className="space-y-12">
            {qbData
              .filter((qb) => qb.season === selectedSeason)
              .map((qb) => (
                <div
                  key={qb.name}
                  className="relative bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-20"
                >
                  <div className="flex items-center space-x-8">
                    <div
                      className="group cursor-pointer relative"
                      onClick={() =>
                        setSelectedQB(qb.name === selectedQB ? null : qb.name)
                      }
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view stats
                        </span>
                      </div>
                      <img
                        src={qb.image}
                        alt={qb.name}
                        className="w-48 h-64 object-cover rounded-lg shadow-2xl"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center mb-4">
                        <h3 className="text-3xl font-bold text-white mr-4">
                          {qb.name}
                        </h3>
                        <span className="text-gray-300">{qb.accolade}</span>
                      </div>

                      <div className="relative h-24 bg-gray-800 rounded-full overflow-visible flex items-center">
                        {/* Distance markers */}
                        <div className="absolute inset-0 flex justify-between px-4 items-center">
                          <span className="text-gray-400 text-sm">0</span>
                          <span className="text-gray-400 text-sm">250</span>
                          <span className="text-gray-400 text-sm">500</span>
                        </div>

                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 z-10"
                          initial={{ x: 0 }}
                          animate={{
                            x:
                              selectedQB === qb.name
                                ? getFootballPosition(qb.playoffYards)
                                : 0,
                          }}
                          transition={{ type: "spring", stiffness: 100 }}
                        >
                          <img
                            src={footballImg}
                            alt="Football"
                            className="w-18 h-12 -mt-8"
                          />
                          {/* Yardage label directly under the football */}
                          {selectedQB === qb.name && (
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                              <span className="text-white font-bold">
                                {qb.playoffYards} yards / game
                              </span>
                            </div>
                          )}
                        </motion.div>

                        {selectedQB === qb.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 mt-4"
                          >
                            <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded-lg p-2">
                              <div className="grid grid-cols-3 gap-3">
                                <div className="bg-gray-800 rounded p-2">
                                  <p className="font-semibold text-gray-200 text-sm">
                                    Total Pass Completion %
                                  </p>
                                  <p className="text-lg text-white text-center">
                                    {qb.completion}
                                  </p>
                                </div>
                                <div className="bg-gray-800 rounded p-2">
                                  <p className="font-semibold text-gray-200 text-sm">
                                    Touchdowns Per Game
                                  </p>
                                  <p className="text-lg text-white text-center">
                                    {qb.touchdowns}
                                  </p>
                                </div>
                                <div className="bg-gray-800 rounded p-2">
                                  <p className="font-semibold text-gray-200 text-sm">
                                    Interceptions Per Game
                                  </p>
                                  <p className="text-lg text-white text-center">
                                    {qb.interceptions}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="relative bg-white bg-opacity-10 rounded-xl px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-20 mt-12 mx-auto max-w-6xl w-full">
          <h2
            className="text-2xl text-white text-center font-bold mb-4"
            style={{ textShadow: "none" }}
          >
            Mahomes: The Model of Consistency
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-none">
            The graphics above compare Patrick Mahomes to other top quarterbacks
            during the corresponding years of the playoffs. Mahomes consistently
            stands out as one of the top-performing QBs, demonstrating his
            unmatched reliability and excellence on the big stage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
