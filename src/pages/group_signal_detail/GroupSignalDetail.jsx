

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
    dispatch(getGroupSignalDataThunk('6773b57ae9eed75638f07f86'));
  }, [dispatch]);

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

  const sendPatchRequest = () => {
    if (updatedSignals.length === 3) {
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
    }
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
