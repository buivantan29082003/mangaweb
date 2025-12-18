import { useEffect, useState } from "react";
import ModalGenres from "../../components/user/ModalGenres";
import Chip from "@mui/material/Chip";
import { getAllWork } from "../../services/api/user/work";
import StoryCard from "../../components/user/story/StoryCard";
import { FilterIcon } from "lucide-react";
import LoadingRow from "../../components/common/LoadingRow";

const Seacrhing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    currentPage: 0,
    totalPage: 0,
    data: [],
  });
  const getWork = (filters) => {
    setIsLoading(true);
    getAllWork(filters)
      .then((v) => {
        setData(v);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="text-left">
      <Filter setData={getWork} />

      {isLoading?<>
        <LoadingRow quanityRow={10}/>
      </>:<div className="mt-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid gap-5">
        {data.data.map((v) => {
          return <StoryCard story={v} />;
        })}
      </div>}
    </div>
  );
};

const Filter = ({ setData }) => {
  const [filters, setFilters] = useState({
    genres: new Map(),
    authors: new Map(),
    sortBy: 1,
  });

  useEffect(() => {
    setData(filters);
  }, []);

  const chooseGenres = (element) => {
    let genre = filters.genres.get(element.id);
    if (genre != null) {
      filters.genres.delete(element.id);
    } else {
      filters.genres.set(element.id, element);
    }
    setFilters({ ...filters });
  };

  const chooseAuthors = (element) => {
    let genre = filters.authors.get(element.id);
    if (genre != null) {
      filters.authors.delete(element.id);
    } else {
      filters.authors.set(element.id, element);
    }
    setFilters({ ...filters });
  };

  const deleteGenreElement = (element) => {
    filters.genres.delete(element.id);
    setFilters({ ...filters });
  };

  const deleteAuthorElement = (element) => {
    filters.authors.delete(element.id);
    setFilters({ ...filters });
  };

  return (
    <div>
      <ModalGenres
        sortBy={filters.sortBy}
        setSortBy={(v) => {
          setFilters({ ...filters, sortBy: v });
        }}
        chooseAuthor={chooseAuthors}
        authorMap={filters.authors}
        chooseElement={chooseGenres}
        genresMap={filters.genres}
        visibleElement={
          <>
            <button className="flex items-center gap-4 inline-block text-md px-4 py-1  border-2 border-pink-700 rounded-full mt-5">
              <FilterIcon size={15} /> <button>Filters</button>
            </button>
          </>
        }
      />
      {filters.genres.size > 0 && (
        <div className="flex gap-3 items-center flex-wrap w-full mt-5">
          <p className="text-md font-medium  ">Thể loại: </p>
          {Array.from(filters.genres.values()).map((v) => {
            return (
              <Chip
                label={v.genreName}
                onDelete={() => deleteGenreElement(v)}
                color="primary"
                variant="outlined"
              />
            );
          })}
        </div>
      )}
      {filters.authors.size > 0 && (
        <div className="flex gap-3 items-center flex-wrap w-full mt-5">
          <p className="text-md font-medium  ">Tác giả: </p>
          {Array.from(filters.authors.values()).map((v) => {
            return (
              <Chip
                label={v.authorName}
                onDelete={() => deleteAuthorElement(v)}
                color="primary"
                variant="outlined"
              />
            );
          })}
        </div>
      )}
      <div></div>
    </div>
    // </div>
  );
};

export default Seacrhing;
