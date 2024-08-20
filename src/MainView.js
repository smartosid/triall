import React from 'react';
import { useLocation } from 'react-router-dom';

const MainView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date');
  const ins = searchParams.get('ins');

  return (
    <div>
      <h4>
        Fetching data for date: {date} and INS department: {ins}
      </h4>
      {/* Add your main view content here */}
    </div>
  );
};


export default MainView;