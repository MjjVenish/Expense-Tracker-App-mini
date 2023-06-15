import { useEffect, useState } from "react";

const useTracker = () => {
  const [transcation, setTranscation] = useState(null);
  const editTrancation = (tranc) => {
    console.log(tranc);
    setTranscation(tranc);
    console.log(transcation);
  };

  return { editTrancation, transcation };
};
export default useTracker;
