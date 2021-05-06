import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useQuery } from "react-query";
import { fetchTvShows } from "../api/fetchTvShows";
import ShowCard from "../components/ShowCard";
import ShowTable from "../components/ShowTable";
import debounce, { isEqual } from "lodash";

const ShowList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, error, isPreviousData } = useQuery(
    ["shows", page, search],
    () => fetchTvShows(page - 1, search)
    // { keepPreviousData: true }
  );
  const [displayMode, setDisplayMode] = useState("cards");

  const onPageInputChange = (event) => {
    event.preventDefault();
    setPage(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setKeyword(event.target.value);
  };

  const onSearch = () => {
    setSearch(keyword);
  };

  const onDisplayModeChange = (mode) => setDisplayMode(mode);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.mesage}</div>;

  return (
    <div>
      {console.log(keyword)}
      {!search && (
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Prev page
          </button>
          <input value={page} onChange={onPageInputChange}></input>
          <button
            onClick={() => {
              if (!isPreviousData) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData}
          >
            Next Page
          </button>
        </div>
      )}

      <div>
        <input value={keyword} onChange={handleChange} type="text" />
        <button onClick={onSearch}>Search</button>
      </div>
      <div>
        {displayMode === "table" && (
          <button onClick={() => onDisplayModeChange("cards")}>Cards</button>
        )}
        {displayMode === "cards" && (
          <button onClick={() => onDisplayModeChange("table")}>Table</button>
        )}
      </div>
      
      <div className="shows">
        {data && data.length > 0 && displayMode === "cards" ? (
          data.map((show) => {
            let data = search ? show.show : show;
            return (
              <ShowCard
                key={data.id}
                show={{ name: data.name, image: data.image, id: data.id }}
              />
            );
          })
        ) : (
          <ShowTable data={data} />
        )}
      </div>
    </div>
  );
};

export default ShowList;
