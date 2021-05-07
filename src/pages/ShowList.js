import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useQuery } from "react-query";
import { fetchTvShows } from "../api/fetchTvShows";
import ShowCard from "../components/ShowCard";
import ShowTable from "../components/ShowTable";
import { useHistory, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTable,
  faIddCard,
  faIdCard,
  faSearch,
  faTimesCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ShowList = () => {
  //const { pages } = useParams();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, error, isPreviousData } = useQuery(
    ["shows", page, search],
    () => fetchTvShows(Number(page) - 1, search),
    { keepPreviousData: true }
  );
  const [displayMode, setDisplayMode] = useState("cards");

  const handleChange = (event) => {
    event.preventDefault();
    setKeyword(event.target.value);
  };

  const emptySearch = () => {
    setKeyword("");
    setSearch("");
  };

  const onSearch = () => {
    console.log(keyword);
    setSearch(keyword);
  };

  const switchDisplayMode = () => {
    if (displayMode === "table") {
      setDisplayMode("cards");
    }
    if (displayMode === "cards") {
      setDisplayMode("table");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error message: + {error.message}</div>;

  return (
    <div>
      <div className="search">
        <input
          value={keyword}
          onChange={handleChange}
          type="text"
          placeholder="Search TV Series"
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={onSearch}
          title="Search TV Series"
        />
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={emptySearch}
          title="Clear search field"
        />
      </div>
      <div className="modeAndPage">
        {displayMode === "table" && (
          <div className="modeSwitch">
            <FontAwesomeIcon icon={faIdCard} onClick={switchDisplayMode} />
            <h4>Switch to card mode</h4>
          </div>
        )}
        {displayMode === "cards" && (
          <div div className="modeSwitch">
            <FontAwesomeIcon icon={faTable} onClick={switchDisplayMode} />
            <h4>Switch to table mode</h4>
          </div>
        )}
        {!search && (
          <div className="pagination">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
            <h3>{page}</h3>
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => Number(old) + 1);
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="shows">
        {search && console.log(data)}
        {data && data.length > 0 && displayMode === "cards" ? (
          data.map((show) => {
            //let data = search ? show.show : show;
            if (search && !show.show) return null;
            let data = search ? show.show : show;
            return (
              <ShowCard
                key={data.id}
                show={{
                  name: data.name,
                  image: data.image,
                  id: data.id,
                  status: data.status,
                  rating: data.rating && data.rating.average,
                }}
              />
            );
          })
        ) : (
          <div className="shows-table">
            <ShowTable data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowList;
