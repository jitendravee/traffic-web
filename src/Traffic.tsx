
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupSignalDataThunk } from "./redux/group_traffic/GroupTrafficThunk";
import { AppDispatch, RootState } from "./redux/Store";

interface Signal {
  signal_id: string;
  lane_no: number;
  current_color: "green" | "yellow" | "red";
  green_duration: number;
  yellow_duration: number;
  red_duration: number;
  vehicle_count: number;
}

interface TrafficSimulationProps {
  signalGroupId:string;
  data: { signals: Signal[] };
  cycleCompleted: (int) => void; 
}
const TrafficSimulation: React.FC<TrafficSimulationProps> = ({ data, cycleCompleted,signalGroupId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const groupId = signalGroupId;

  const groupTraffic = useSelector((state: RootState) => state.groupTraffic);

  const [signals, setSignals] = useState<Signal[]>(data.signals);

  useEffect(() => {
    dispatch(getGroupSignalDataThunk(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (groupTraffic.data && groupTraffic.data.signals) {
      setTimeout(()=>{
        setSignals(groupTraffic?.data?.signals || []);

      },5000)
    }
  }, [groupTraffic.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prevSignals) =>
        prevSignals.map((signal, index) => {
          let { current_color, green_duration, yellow_duration, red_duration } = signal;

          if (current_color === "green") {
            green_duration--;
            if (green_duration === 0) {
              current_color = "yellow";
              yellow_duration = 5; // Reset yellow duration

              dispatch(getGroupSignalDataThunk(groupId));
            }
          } else if (current_color === "yellow") {
            yellow_duration--;
            if (yellow_duration === 0) {
              current_color = red_duration > 0 ? "red" : "green";
            }
          } else if (current_color === "red") {
            red_duration--;
            if (red_duration === 5) {
              current_color = "yellow";
              yellow_duration = 5;
            }
          }

          if (index === 0) {
            cycleCompleted(red_duration);
          }

          return {
            ...signal,
            current_color,
            green_duration,
            yellow_duration,
            red_duration,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, groupId, cycleCompleted]);



  
  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold text-gray-800">{`Group Tokyo`}</h1>
      <div className="grid grid-cols-3 gap-6">
        {signals.map((signal) => (
          <div
            key={signal.signal_id}
            className="w-40 p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
          >
            <h2 className="text-lg font-semibold text-gray-700">Lane {signal.lane_no}</h2>
            <div
              className={`w-16 h-16 rounded-full border-4 ${
                signal.current_color === "green"
                  ? "bg-green-500 border-green-700"
                  : signal.current_color === "yellow"
                  ? "bg-yellow-500 border-yellow-700"
                  : "bg-red-500 border-red-700"
              }`}
            ></div>
            <p className="mt-2 text-sm text-gray-500">
              {signal.current_color} for{" "}
              {signal.current_color === "green"
                ? signal.green_duration
                : signal.current_color === "yellow"
                ? signal.yellow_duration
                : signal.red_duration}{" "}
              seconds
            </p>
            <p className="mt-2 text-sm text-gray-500">Vehicles: {signal.vehicle_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSimulation;
