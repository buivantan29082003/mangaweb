import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import { getAllGenre } from "../../services/api/common/genre";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Book, SortAsc, Tag } from "lucide-react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { getAllAuthors } from "../../services/api/common/Author"; 

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ModalGenres({
  visibleElement,
  genresMap,
  chooseElement,
  chooseAuthor,
  authorMap,
  sortBy,
  setSortBy,
}) {
  const [open, setOpen] = React.useState(false);
  const [genres, setGenres] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [authors, setAuthors] = React.useState([]);
  

  const chooseElemnent = (element) => {
    chooseElement(element);
  };

  React.useEffect(() => { 

    getAllGenre().then((v) => {
      setGenres(v);
      
    });
    getAllAuthors().then((v) => { 
      setAuthors(v);
    });
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
          <h2 class="text-2xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-700">
            Lọc nâng cao
          </h2>
          <div className="flex gap-2 items-center mb-4">
            <Tag size={20} color="#4d6bffff" />
            <p className="font-bold text-sm my-2  ">Thể loại</p>
          </div>
          <div
            className="p-4 mb-4 rounded-md"
            style={{ border: "0.1px solid #fbe6e6ff" }}
          >
            <div className="flex  mb-4 border-b">
              <Checkbox size="small" />
              <p className="font-bold text-sm my-2  ">Tất cả thể loại</p>
            </div>
            <div
              className="grid grid-cols-3 gap-3 h-[150px]  overflow-auto
        [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar]:h-0.5   <!-- Làm scrollbar nhỏ (width 4px, thay đổi số tùy ý) -->
            [&::-webkit-scrollbar-thumb]:bg-gray-500  <!-- Màu thumb (nút kéo) -->
            [&::-webkit-scrollbar-thumb]:rounded-full <!-- Bo tròn thumb -->
            [&::-webkit-scrollbar-track]:bg-gray-200 items-center mb-5  
                
            "
            >
              {genres.map((v) => {
                return (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={() => chooseElemnent(v)}
                          checked={genresMap.get(v.id) != null}
                          size="small"
                        />
                      }
                      label={<span className="text-xs">{v.genreName}</span>}
                    />
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 items-center mb-4">
            <Book size={20} color="#4d6bffff" />
            <p className="font-bold text-sm my-2  ">Tác giả</p>
          </div>
          <FormControl sx={{ width: "100%" }}>
            {/* <InputLabel
              id="demo-multiple-checkbox-label"
              sx={{ color: "white" }}
            >
              Tag
            </InputLabel> */}
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              sx={{
                color: "white",
                border: "1px solid white",
              }}
              value={authors.map((v) => v.authorName)}
              // onChange={handleChange}
              input={<OutlinedInput color="white" label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {authors.map((v) => (
                <MenuItem
                  onChange={() => {
                    chooseAuthor(v);
                  }}
                  key={v.authorName}
                  value={v.authorName}
                >
                  <Checkbox checked={authorMap.get(v.id) != null} />
                  <ListItemText primary={v.authorName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex gap-2 items-center mt-4">
            <SortAsc size={20} color="#4d6bffff" />
            <p className="font-bold text-sm my-2  ">Sorting</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={setSortBy.bind(null, 1)}
              className={`py-2 px-4 rounded-full border border-blue-600 text-white ${
                sortBy === 1 ? "bg-blue-600 border-white" : ""
              }`}
            >
              Mới cập nhật
            </button>
            <button
              onClick={setSortBy.bind(null, 2)}
              className={`py-2 px-4 rounded-full border border-blue-600 text-white ${
                sortBy === 2 ? "bg-blue-600 border-white" : ""
              }`}
            >
              Yêu thích nhất
            </button>
            <button
              onClick={setSortBy.bind(null, 3)}
              className={`py-2 px-4 rounded-full border border-blue-600 text-white ${
                sortBy === 3 ? "bg-blue-600 border-white" : ""
              }`}
            >
              Lượt xem cao nhất
            </button>
            <button
              onClick={setSortBy.bind(null, 4)}
              className={`py-2 px-4 rounded-full border border-blue-600 text-white ${
                sortBy === 4 ? "bg-blue-600 border-white" : ""
              }`}
            >
              Truyện mới nhất
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
