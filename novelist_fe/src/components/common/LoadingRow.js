import { Skeleton } from "@mui/material"

const LoadingRow = ({ quanityRow, color="grey.900" }) => {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: quanityRow }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width="100%"
          height={24}
          sx={{ bgcolor: color }}
        />
      ))}
    </div>
  );
};

export default LoadingRow;
