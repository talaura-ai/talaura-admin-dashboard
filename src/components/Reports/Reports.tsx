import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/assessments');
  }, []);
  return (
    <div>
      {' '}
      <h1>REPORTS /reports</h1>
    </div>
  );
};

export default Reports;
