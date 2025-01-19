

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupSignalDataThunk } from '../../redux/group_traffic/GroupTrafficThunk';
import { VideoUpload } from '../../VideoUpload';
import axios from 'axios';
import TrafficSimulation from '../../Traffic';

const GroupSignalDetail = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.groupTraffic);
  const [signals, setSignals] = useState(data?.signals || []);
  const [updatedSignals, setUpdatedSignals] = useState([]);
  const uploadFunctions = [];

  useEffect(() => {
    console.log("called")
    callTheModel()
    
  }, []);

  useEffect(() => {
    if (data && data.signals) {
      setSignals(data.signals);
    }
  }, [data]);

  const triggerAllUploads = () => {
    uploadFunctions.forEach((triggerUpload) => triggerUpload());
  };

  const getImageUrl = (url, signal_id) => {
    setUpdatedSignals((prevSignals) => {
      const updatedSignalList = prevSignals.filter((signal) => signal.signal_id !== signal_id);
      updatedSignalList.push({ signal_id, signal_image: url });
      return updatedSignalList;
    });
  };
  // const callTheModel = async () => {
  //   try {
  //     // First API Call - /initialize
  //     const response1 = await axios.get('http://localhost:8000/initialize?id=6773b57ae9eed75638f07f86');
  //     console.log(`response after initialize:`, response1.data);
  
  //     // Check if initialization was successful
  //     if (response1.data.message === "Initialization successful") {
  //       // Wait for 2 seconds before dispatching another action
  //       setTimeout(async () => {
  //         // Dispatching the next action (optional, depends on your need)
  //         dispatch(getGroupSignalDataThunk('6773b57ae9eed75638f07f86'));
  
  //         // Second API Call - /control
          
  //       }, 2000); // Delay of 2 seconds before next action
  //       try {
  //         const response2 = await axios.get('http://localhost:8000/control?id=6773b57ae9eed75638f07f86');
  //         console.log(`response after control:`, response2.data);
  //       } catch (error) {
  //         console.error("Error during /control API call:", error);
  //       }
       
  //     } else {
  //       console.error("Initialization failed:", response1.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during /initialize API call:", error);
  //   }
  // };
  const callTheModel = async () => {
    try {
      // First API Call - /initialize
      const response1 =  axios.get('http://localhost:8000/initialize?id=6773b57ae9eed75638f07f86');
      console.log(`response after initialize:`, response1.data);
  
      // Check if initialization was successful
      // if (response1.data.message === "Initialization successful") {
        // try {
        //   // Call /control API
        //   const response2 =  axios.get('http://localhost:8000/control?id=6773b57ae9eed75638f07f86');
        //   console.log(`response after control:`, response2.data);
        // } catch (error) {
        //   console.error("Error during /control API call:", error);
        // }
  
        // Dispatching the next action after 2 seconds
        setTimeout(() => {
          dispatch(getGroupSignalDataThunk('6773b57ae9eed75638f07f86'));
        }, 2000); // Delay of 2 seconds before dispatching
  
      // } else {
      //   console.error("Initialization failed:", response1.data.message);
      //   // Ensure dispatch happens even if initialization fails
      //   setTimeout(() => {
      //     dispatch(getGroupSignalDataThunk('6773b57ae9eed75638f07f86'));
      //   }, 2000); // Delay of 2 seconds before dispatching
      // }
  
    } catch (error) {
      console.error("Error during /initialize API call:", error);
      // Ensure dispatch happens even if /initialize fails
      // setTimeout(() => {
      //   dispatch(getGroupSignalDataThunk('6773b57ae9eed75638f07f86'));
      // }, 2000); // Delay of 2 seconds before dispatching
    }
  };
  
  
  
  const sendPatchRequest = () => {
      const payload = { image_list: updatedSignals };

      axios
        .patch('https://go-clean-architectur.onrender.com/v1/signal/6773b57ae9eed75638f07f86/update-image', payload)
        .then((response) => {
          console.log('Successfully updated images:', response);
        })
        .catch((error) => {
          console.error('Error updating images:', error);
        });

      setUpdatedSignals([]);
    
  };

  useEffect(() => {
    if (updatedSignals.length === 3) {
      sendPatchRequest();
    }
  }, [updatedSignals]);
  const handleCycleCompleted = (redDuration) => {
if(redDuration === 13){

  triggerAllUploads()

}
if(redDuration === 5){
  callTheModel()
}

    // console.log(redDuration)
    //  the logic for when the cycle completes
  };

  if (error) return <div>Error: {error}</div>;
  if (!signals || signals.length === 0) return <div>No data available</div>;

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold text-gray-800">{`Group Tokyo`}</h1>
      <button
        onClick={triggerAllUploads}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Upload All Signals
      </button>
      <div className="grid grid-cols-3 gap-6">
        {signals.map((signal, index) => (
          <div key={signal.signal_id} className="flex flex-col items-center">
            <h2>{`Signal ${index + 1}`}</h2>
            <VideoUpload
              videoUrl={`src/assets/video${index + 1}.mp4`}
              onUploadComplete={(url) => getImageUrl(url, signal.signal_id)}
              onTriggerUpload={(triggerUpload) => {
                uploadFunctions[index] = triggerUpload;
              }}
            />
          </div>
        ))}
      </div>
                  <TrafficSimulation data={data} cycleCompleted={handleCycleCompleted} signalGroupId='6773b57ae9eed75638f07f86'/>

    </div>
  );
};

export default GroupSignalDetail;
