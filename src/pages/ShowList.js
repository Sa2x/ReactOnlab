import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchTvShows } from "../api/fetchTvShows";
import { Link } from "react-router-dom";
import ShowCard from "../components/ShowCard";

const ShowList = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, error, isPreviousData } = useQuery(
    ["shows", page],
    () => fetchTvShows(page),
    { keepPreviousData: true }
  );

  const onPageInputChange = (event) => {
    event.preventDefault();
    setPage(event.target.value);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;

  return (
    <div>
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
          Prev page
        </button>
        <input value={page} onChange={onPageInputChange}></input>
        <button
          onClick={() => {
            if (!isPreviousData) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData}
        >
          Next Page
        </button>
      </div>
      <div>
        {console.log(data)}
        {data &&
          data.length > 0 &&
          data.map((show) => (
            // <Link to={`/shows/${show.id}`}>
            //   <h3>{show.name}</h3>
            // </Link>
            <ShowCard show={show} />
          ))}
      </div>
    </div>
  );
};

export default ShowList;
