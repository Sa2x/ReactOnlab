import React, { useState, useMemo, useEffect } from 'react';
import { useShowQuery } from './useShowQuery';
import ShowCard from '../../components/ShowCard';
import ShowTable from '../../components/ShowTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTable,
  faIdCard,
  faSearch,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSnackbar } from 'notistack';
import { debounce } from 'lodash';

const ShowList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [displayMode, setDisplayMode] = useState('cards');

  const { data, isLoading, error, isPreviousData } = useShowQuery(page, search);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    event.preventDefault();
    setKeyword(event.target.value);
  };

  const emptySearch = () => {
    setKeyword('');
    setSearch('');
  };

  const onSearch = () => {
    setSearch(keyword);
  };

  const switchDisplayMode = () => {
    if (displayMode === 'table') {
      setDisplayMode('cards');
    }
    if (displayMode === 'cards') {
      setDisplayMode('table');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const renderTable = () => {
    if (search.length === 0) {
      return <ShowTable data={data} />;
    } else {
      const datas = data.map((show) => show.show).filter((data) => data);
      return <ShowTable data={datas} />;
    }
  };

  useEffect(() => {
    enqueueSnackbar('Navigate between pages with left and right arrow', 5000);
  }, []);

  useHotkeys(
    'right',
    debounce(() => setPage((page) => page + 1), 300)
  );

  useHotkeys(
    'left',
    debounce(() => setPage((page) => page - 1), 300)
  );

  if (isLoading) return <div data-testid="loader">Loading...</div>;

  if (error)
    return <div data-testid="error"> Error message: + {error.message}</div>;

  return (
    <div>
      <div className="search">
        <input
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
        {displayMode === 'table' && (
          <div className="modeSwitch">
            <FontAwesomeIcon icon={faIdCard} onClick={switchDisplayMode} />
            <h4>Switch to card mode</h4>
          </div>
        )}
        {displayMode === 'cards' && (
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
        {data && data.length > 0 && displayMode === 'cards' ? (
          data.map((show) => {
            //let data = search ? show.show : show;
            if (search && !show.show) return null;
            let data = search ? show.show : show;
            return (
              <ShowCard
                key={data.apiId}
                show={{
                  name: data.name,
                  image: data.imgSrc,
                  id: data.apiId,
                  status: data.status,
                  rating: data.ratingAverage,
                }}
              />
            );
          })
        ) : (
          <div className="shows-table">{renderTable()}</div>
        )}
      </div>
    </div>
  );
};

export default ShowList;
