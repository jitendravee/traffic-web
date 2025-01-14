import { Route, Routes } from 'react-router-dom';
import GroupSignalDetail from '../pages/group_signal_detail/GroupSignalDetail';
import TrafficSimulation from '../Traffic';

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
    </Routes>
    
  );
};

export default AllRoutes;
