import { tw } from '~/lib/utils';

export default function ChessboardBackground() {
  return (
    <svg
      aria-hidden="true"
      className={tw(
        'pointer-events-none absolute top-1/2 right-0 -z-10 aspect-square w-[clamp(280px,31vw,380px)] -translate-y-1/2 mask-[linear-gradient(90deg,transparent,#000_38%,#000)]',
        'max-sm:-right-9 max-sm:w-[240px] max-sm:mask-[linear-gradient(90deg,transparent,#000_32%)]'
      )}
      focusable="false"
      viewBox="0 0 640 640">
      <defs>
        <pattern id="chessboard-squares" width="160" height="160" patternUnits="userSpaceOnUse">
          <path className="fill-active/80" d="M0 0h80v80H0zM80 80h80v80H80z" />
          <path className="fill-paper-raised" d="M80 0h80v80H80zM0 80h80v80H0z" />
        </pattern>
      </defs>
      <path fill="url(#chessboard-squares)" d="M0 0h640v640H0z" />
      <path className="stroke-rule fill-none stroke-1" d="M1 1h638v638H1z" />
    </svg>
  );
}
