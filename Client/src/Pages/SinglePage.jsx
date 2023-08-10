import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingle } from "../lib/axios/getdetails";

const SinglePage = () => {
  const { id } = useParams();
  const [singleData, setSingleData] = useState([]);

  useEffect(() => {
    getSingle(id).then((res) => {
      const { datas } = res.data;
      setSingleData(datas);
    });
  }, []);
  return (
    <div>
      {singleData.map((data, i) => (
        <React.Fragment key={i}>
          <h1>{data.expense}</h1>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SinglePage;
