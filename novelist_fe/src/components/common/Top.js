const Top100Svg = ({
  width = 600,
  height = 200,
  color = "#7C4DFF",
  background = "transparent",
  complement
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="600" height="200" fill={background} />

      {/* TOP text */}
      <text
        x="60"
        y="115"
        fill={color}
        fontSize="24"
        letterSpacing="18"
        fontFamily="Arial, Helvetica, sans-serif"
        opacity="0.85"
      >
        TOP   
      </text>
       

      {/* Number 1 */}
      <path
        d="M260 40 L240 55 V70 L260 60 V160 H280 V40 Z"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* First 0 */}
      <circle
        cx="340"
        cy="100"
        r="55"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
      <circle
        cx="340"
        cy="100"
        r="40"
        fill="none"
        stroke={color}
        strokeWidth="6"
        opacity="0.6"
      />
      
    
      
    </svg>
  );
};

export default Top100Svg;
