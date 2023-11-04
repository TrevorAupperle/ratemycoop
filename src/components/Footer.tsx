import Link from "next/link";

const Footer = () => {
  return (
    <footer className="blueGraphPaper flex w-full items-center justify-center px-6 py-4 text-sm text-white">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <div>© 2023 Samuel Ginn College of Engineering</div>
        <div className="flex items-baseline border-white tracking-wide hover:underline">
          <Link
            href="https://www.linkedin.com/in/trevor-aupperle/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Architect: Trevor Aupperle
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
