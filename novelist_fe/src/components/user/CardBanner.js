import RankIcon from "../common/Ranking";

const CardBanner = ({ story, rank}) => {
  return (
    <>
      <div className="  flex items-start gap-4 p-4 rounded-[7px] filter bg-white relative">
        <div className="w-5/12">
          <img
            src={story.image}
            className="w-[150px] h-[120px] object-cover"
            alt="ANH"
          />
        </div>
        <div className="w-6/12 text-white text-left">
          <button className="italic text-[10px] font-semibold py-1 px-2 filter rounded-full">
            CÓ THỂ BẠN THÍCH
          </button>
          <p className="text-md my-3 font-bold">{story.name}</p>
          <p className="break-normal text-sm text-gray-500 top-2 left-2 absolute">
           
              <div
            class="px-3 py-1 rounded-lg text-white text-sm font-semibold 
                  bg-gradient-to-r from-[#FF5F2E] to-[#FFC36A]"
            >
            04~12 [End]
          </div>
          </p>
        </div>
        <div className="top-2 right-2 position-absolute">
          <RankIcon color={rankings[rank-1]} rank={rank} />
      </div>
      </div>
    </>
  );
};

const rankings=["text-yellow-500", "text-sky-500","text-white"]

export default CardBanner;
