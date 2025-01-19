import { Route, Routes } from 'react-router-dom';
import GroupSignalDetail from '../pages/group_signal_detail/GroupSignalDetail';
import TrafficSimulation from '../Traffic';
import VideoStream from '../pages/LiveVideo';

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path='/group'
        element={
          <>
            <GroupSignalDetail />

          </>
        }
      />
      <Route path='/' element = {<>
      <TrafficSimulation />
      </>} />
      <Route path='/video' element= {
        <>
        <VideoStream />
        </>
      } />
    </Routes>
    
  );
};

export default AllRoutes;
