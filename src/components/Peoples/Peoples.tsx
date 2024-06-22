import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Peoples = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/assessments');
  }, []);
  return (
    <div>
      {' '}
      <h1>Peoples /peoples</h1>
    </div>
  );
};

export default Peoples;
