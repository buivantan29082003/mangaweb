import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ModalGenres from "../../components/user/ModalGenres";
import { getAllWork } from "../../services/api/admin/work";
import { formatReactionNumber } from "../../services/utils/FormatReactionNumber";
import { Heart, Link, Plus, View } from "lucide-react";
import AddWorkForm from "../../components/admin/AddWorkForm";  
import LoadingRow from "../../components/common/LoadingRow";
import { useNavigate } from "react-router-dom";
const ManageWorks = () => {
  const [filters, setFilters] = useState({});
  const [works, setWorks] = useState({
    totalPage: 1,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
 
  const getWork = (filters) => {
    setIsLoading(true)
    getAllWork(filters).then((v) => {
      setWorks(v);
    }).catch(error=>{
      
    })
    .finally(e=>{
      setIsLoading(false)
    })
  };
  const navigate=useNavigate()

  return (
    <>
      <div className="flex my-5 justify-between">
        <p></p>
        <AddWorkForm
          visibleElement={
            <button className="border border-2 rounded-sm py-1 px-3 border-violet-500 text-violet-500">
              <span className="text-xl">+</span> Add work
            </button>
          }
        />
      </div>
      <div className="flex mt-4 flex-wrap mb-4 items-center gap-5">
        <Stack spacing={2}>
          <Pagination
            onChange={(e, value) => {
              filters.currentPage = value;
              // getBookMarks()
            }}
            count={works.totalPage}
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
          />
        </Stack>
        <input
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          placeholder="enter your keywork"
          className="border border-gray-800 outline-none py-1 px-2 rounded-sm bg-transparent"
        />
        <Filter setData={getWork} />
        <button className="py-1 px-3 rounded-sm bg-violet-500 text-white font-semibold hover:bg-violet-700">
          Search
        </button>
      </div>
      {isLoading&&<LoadingRow quanityRow={10}/>}
      {!isLoading && (
        <>
          {/* header */}
          <div className="grid grid-cols-12 px-4 text-left py-2 text-md overflow-auto font-semibold text-gray-400">
            <div className="col-span-2">ID</div>
            <div className="col-span-4">Chapter</div>
            <div className="col-span-2 ">Traffic</div>
            <div className="col-span-2">Static</div>
            <div className="col-span-2 ">Action</div>
          </div>
          

          {/* rows */}
          {works.data.map((v) => (
            <div
              key={v.id}
              className="grid my-2 grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              {/* ID */}
              <div className="col-span-2 text-sm text-left text-gray-200">
                #{v.id}
              </div>

              {/* Chapter (image + title + subtitle) */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    alt=""
                    src={v.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                    ▶
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="font-medium text-white truncate">
                    {v.name}
                  </div>
                  <div className="text-gray-400 text-xs mt-1 truncate">
                    {v.title}
                  </div>
                </div>
              </div>

              {/* Traffic */}
              <div onClick={navigate.bind(null,"/admin/work/traffic/"+v.id)} className="col-span-2 text-sm text-right text-gray-200">
                <div className="flex items-center gap-2 text-red-500">
                  <View size={10} /> {formatReactionNumber(v.view)}
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <Plus size={10} /> {formatReactionNumber(v.following)}
                </div>
                <div className="flex items-center gap-2 text-yellow-500">
                  <Heart size={10} /> {formatReactionNumber(v.like)}
                </div>
              </div>

              {/* Static */}
              <div className="col-span-2 font-semibold text-left text-gray-200">
                {v.statusWork?.statusName ?? "—"}
              </div>

              {/* Action */}
              <div className="col-span-2 text-left ">
                <button  onClick={navigate.bind(null,"/admin/work/chapter/add/"+v.id)} className="px-3 block mb-2 py-1 rounded bg-indigo-600 text-white text-sm">
                  Add chapter
                </button>
                <button onClick={navigate.bind(null,"/admin/work/"+v.id)} className="px-3 py-1 mb-2 block rounded bg-yellow-600 text-white text-sm">
                  Details
                </button>
                <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
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
            <button className="py-1 px-3 rounded-sm bg-transparent text-white font-semibold border border-violet-700">
              Xem thêm bộ lọc
            </button>
          </>
        }
      />
      <div></div>
    </div>
  );
};

export default ManageWorks;
