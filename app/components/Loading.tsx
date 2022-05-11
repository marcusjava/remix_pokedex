import React from "react";
import { PulseLoader } from "react-spinners";

// import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <div className="overlay">
      <PulseLoader color="#ef5350" size={60} />
    </div>
  );
};

export default Loading;
