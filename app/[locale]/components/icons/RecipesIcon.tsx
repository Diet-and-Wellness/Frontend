const RecipesIcon = ({ className }: { className: string }) => {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <g clipPath="url(#a)">
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.23 4.215a.544.544 0 0 0-.744.184l-3.834 6.079h2.16l2.729-5.456a.58.58 0 0 0 .038-.42.57.57 0 0 0-.255-.332zm-1.17 6.263 2.469-4.936c.195-.39.236-.842.115-1.262a1.7 1.7 0 0 0-.765-.996l-.093-.055a1.63 1.63 0 0 0-1.225-.181 1.67 1.67 0 0 0-1.009.733l-4.222 6.697H3v1.138h.556v1.708c0 3.292 2.098 6.082 5 7.042v2.065c0 .15.058.296.162.402a.55.55 0 0 0 .393.167h7.778a.55.55 0 0 0 .393-.167.58.58 0 0 0 .162-.402v-2.065c2.902-.96 5-3.75 5-7.042v-1.708H23v-1.138zm2.273 1.138H4.667v1.708c0 3.458 2.736 6.26 6.11 6.26h4.445c3.375 0 6.111-2.802 6.111-6.26zm-10.555 9.107H9.667v1.139h6.666v-1.139z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="none" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
};

export default RecipesIcon;
