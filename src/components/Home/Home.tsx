import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/assessments');
  }, []);

  return (
    <div>
      {' '}
      <h1>Main Area com 1 url /</h1>
    </div>
  );
};

export default Home;
