import { cn } from "@/lib/utils";

export function FlourishULogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <path
          d="M12 6C9.17 6 6.74 7.82 5.76 10.5H8.09C8.83 8.93 10.29 8 12 8C13.71 8 15.17 8.93 15.91 10.5H18.24C17.26 7.82 14.83 6 12 6Z"
          fill="currentColor"
        />
        <path
          d="M12 16C14.83 16 17.26 14.18 18.24 11.5H15.91C15.17 13.07 13.71 14 12 14C10.29 14 8.83 13.07 8.09 11.5H5.76C6.74 14.18 9.17 16 12 16Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-headline text-xl font-bold">FlourishU</span>
    </div>
  );
}
