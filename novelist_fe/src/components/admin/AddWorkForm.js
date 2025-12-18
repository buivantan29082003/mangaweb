import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"; 
import { getAllAuthors } from "../../services/api/common/Author";
import { getAllStatus } from "../../services/api/common/Status";
import { getAllGenre } from "../../services/api/common/genre";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateImage } from "../../services/api/common/UploadImage";
import { created } from "../../services/api/admin/work";
import { getDataError } from "../../services/api/common/ErrorData";
import { LoaderIcon } from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "linear-gradient(135deg,#1a1a2e,#16213e)",
  boxShadow: 24,
  p: 4,
  maxWidth: 800,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "8px",
};
export default function AddWorkForm({ visibleElement }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [work, setWork] = React.useState({
    name: "",
    title: "",
    statusId: null,
    authorId: null,
    description: "",
    genreIds: new Map(),
    image:null
  });
  const [isCreating,setIsCreating]=React.useState(false)
  const [tempInfo, setTempInfo] = React.useState({
    authors: [],
    statusWorks: [],
    genres: [],
  });

  const createWork=()=>{
    setIsCreating(true)
    created({...work,genreIds:Array.from(work.genreIds.keys())}).then(v=>{
      alert("Thêm thành công work")
    }).catch(error=>{
      alert(getDataError(error).data)
    }).finally(e=>{
      setIsCreating(false)
    })
  }

  const upload = (e) => {
    const file = e.target.files[0];  
  
    if (!file) return;
  
    updateImage(file)
      .then((v) => {
        setWork({...work,image:v})
      })
      .catch(() => {
        alert("Có lỗi xảy ra nha bạn ơi.");
      });
  };

  const changeInput=(e)=>{
    setWork({...work,[e.target.name]:e.target.value})
  }
  

  React.useEffect(() => {
    Promise.all([getAllAuthors(), getAllStatus(), getAllGenre()]).then(
      ([authors, statusWorks, genres]) => {
        setTempInfo({
          authors,
          statusWorks,
          genres,
        });
      }
    );
  }, []);

  return (
    <div>
      <div onClick={handleOpen}>{visibleElement}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="rounded-md text-white text-sm text-sm  w-10/12 md:w-5/12
        overflow-auto
        [&::-webkit-scrollbar]:w-1    <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
            [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
            [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
            [&::-webkit-scrollbar-track]:bg-gray-200
        "
          sx={style}
        >
          <div>
            <h1 className="text-center font-medium text-xl mb-5">
              ADD WORK FORM
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
              {/* Budget Range */}
              <div className="flex flex-col">
                <label className="text-sm font-medium  text-sky-500 mb-2">
                  Name of work
                </label>
                <input
                  value={work.name}
                  name="name"
                  onChange={changeInput.bind(this)}
                  className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
                />
              </div>

              {/* Start Date & Deadline */}
              <div className="flex flex-col">
                <label className="text-sm font-medium  text-sky-500 mb-2">
                  Title
                </label>
                <input
                  value={work.title}
                  name="title"
                  onChange={changeInput.bind(this)}
                  className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget Range */}
              <div className="flex flex-col">
                <label className="text-sm font-medium  text-sky-500 mb-2">
                  Status
                </label>
                <select
                  value={work.statusId}
                  name="statusId"
                  onChange={changeInput.bind(this)}
                  className="w-full p-1  ountline-none border border-gray-400 rounded-sm bg-transparent"
                >
                  {tempInfo.statusWorks.map((v) => {
                    return <option value={v.id}>Writing</option>;
                  })}
                </select>
              </div>

              {/* Start Date & Deadline */}
              <div className="flex flex-col">
                <label className="text-sm font-medium  text-sky-500 mb-2">
                  Author
                </label>
                <select
                  value={work.authorId}
                  name="authorId"
                  onChange={changeInput.bind(this)}
                  className="w-full p-1 outline-none border border-gray-400 rounded-sm bg-transparent custom-select"
                >
                  {tempInfo.authors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.authorName}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            {/* Project Description */}
            <div className="mt-6">
              <label className="text-sm font-medium text-sky-500 mb-2 block">
                Content of work
              </label>

              <textarea
                value={work.description}
                name="description"
                onChange={changeInput.bind(this)}
                placeholder="Add Description"
                className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none    outline-none"
              ></textarea>
            </div>
            <div className="mt-6">
              <label className="text-sm font-medium text-sky-500 mb-2 block">
                Choose image <input type="file" 
                  onChange={(e) => {
                    upload(e)
                  }}
                  placeholder="Add Description"
                  className=" ml-3 bg-transparent   rounded-lg   resize-none    outline-none"
                />
              </label>

              <div className="flex items-center"> 
                <img className="w-9/12 " src={work.image} alt=""/>
              </div>
            </div>

            {/* nfvnjfvjnfvn */}
<label className="text-sm mt-3 font-medium text-sky-500 mb-2 block">
                Genres
              </label>
            <div
              className="mt-2  grid grid-cols-3 gap-3 h-[150px]  overflow-auto
              [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar]:h-0.5   <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
              [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
              [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
              [&::-webkit-scrollbar-track]:bg-gray-200 items-center mb-5 "
            >
              
              {tempInfo.genres.map((v) => {
                return (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={() => {
                            const newGenres = new Map(work.genreIds); 
                            if (newGenres.has(v.id)) {
                              newGenres.delete(v.id);
                            } else {
                              newGenres.set(v.id, v.id);
                            } 
                            setWork({
                              ...work,
                              genreIds: newGenres,
                            });
                          }}
                          checked={work.genreIds.get(v.id) != null}
                          size="small"
                        />
                      }
                      label={<span className="text-xs">{v.genreName}</span>}
                    />
                  </>
                );
              })}
              <div />
            </div>
            <button className="bg-sky-500 py-2 px-3 font-semibold rounded-sm" disabled={isCreating} onClick={createWork}>{isCreating?<div className="flex gap-2 items-center"><LoaderIcon/> Đang thực hiện  </div>:"Thực hiện"}</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
