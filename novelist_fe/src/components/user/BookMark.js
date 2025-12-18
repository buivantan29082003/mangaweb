import React, { useEffect, useRef, useState } from "react";

export default function BookmarkAnimated({
  size = 28,
  color = "sky-500",
  isBookMark = false,
  className = "",
  handleOnClick,
}) {
  const [play, setPlay] = useState(false);
  const prevRef = useRef(isBookMark);

  useEffect(() => {
    if (!prevRef.current && isBookMark) {
      setPlay(true);
      const t = setTimeout(() => setPlay(false), 600);
      return () => clearTimeout(t);
    }
    prevRef.current = isBookMark;
  }, [isBookMark]);

  const textColorClass = `text-${color}`;
  const strokeWhenFilled = "stroke-white";
  const strokeWhenEmpty = "stroke-current";

  return (
    <>
      <style>
        {`
        @keyframes sparkle-pop {
          0% { transform: translateY(0) scale(0.2); opacity: .0; }
          40% { transform: translateY(-6px) scale(1.05); opacity: 1; }
          100% { transform: translateY(-12px) scale(0.9); opacity: 0; }
        }
        @keyframes sparkle-rotate {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(20deg); opacity: 1; }
          100% { transform: scale(0.9) rotate(40deg); opacity: 0; }
        }
        .sparkle {
          transform-origin: center;
          opacity: 0;
        }
        .sparkle.play-1 { animation: sparkle-pop .45s cubic-bezier(.2,.8,.3,1) 0ms forwards; }
        .sparkle.play-2 { animation: sparkle-pop .48s cubic-bezier(.2,.8,.3,1) 45ms forwards; }
        .sparkle.play-3 { animation: sparkle-rotate .55s cubic-bezier(.2,.8,.3,1) 80ms forwards; }
        .sparkle.play-4 { animation: sparkle-rotate .5s cubic-bezier(.2,.8,.3,1) 20ms forwards; }
        .bookmark-transition {
          transition: transform .18s ease, opacity .18s ease;
          transform-origin: center;
        }
        .bookmark-bounce {
          animation: bounce-fill .22s cubic-bezier(.2, .8, .3, 1);
        }
        @keyframes bounce-fill {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        `}
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${textColorClass} ${className}`}
        onClick={handleOnClick}
        aria-hidden="true"
      >
        <g className={`bookmark-transition ${isBookMark ? "bookmark-bounce" : ""}`}>
          <path
            d="M6 2h12v18l-6-4-6 4V2z"
            fill={isBookMark ? "currentColor" : "none"}
            strokeWidth={isBookMark ? 0 : 1.5}
            className={isBookMark ? `${strokeWhenFilled}` : `${strokeWhenEmpty}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {isBookMark && (
            <path
              d="M6 2h12v18l-6-4-6 4V2z"
              fill="currentColor"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />
          )}
        </g>

        <g transform="translate(12,8)">
          <g transform="translate(-12,-8)">
            <g transform="translate(3,2)">
              <g transform="translate(6,6)">
                <g style={{ transformOrigin: "center" }}>
                  <line
                    x1="0"
                    y1="-6"
                    x2="0"
                    y2="-14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    className={`sparkle ${play ? "play-1" : ""}`}
                    style={{ opacity: 0 }}
                  />
                  <line
                    x1="6"
                    y1="-4"
                    x2="12"
                    y2="-10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className={`sparkle ${play ? "play-2" : ""}`}
                    style={{ opacity: 0 }}
                  />
                  <line
                    x1="-6"
                    y1="-4"
                    x2="-12"
                    y2="-10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className={`sparkle ${play ? "play-3" : ""}`}
                    style={{ opacity: 0 }}
                  />
                  <circle
                    cx="0"
                    cy="-10"
                    r="1.6"
                    fill="currentColor"
                    className={`sparkle ${play ? "play-4" : ""}`}
                    style={{ opacity: 0 }}
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}
