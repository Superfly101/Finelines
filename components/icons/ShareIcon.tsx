const ShareIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[1.8rem]"
        viewBox="0 0 512 512"
      >
        <circle
          cx="128"
          cy="256"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <circle
          cx="384"
          cy="112"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <circle
          cx="384"
          cy="400"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94"
        />
      </svg>
    </div>
  );
};

export default ShareIcon;
