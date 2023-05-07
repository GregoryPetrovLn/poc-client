import { FC } from "react";

interface Props {
  href: string;
  title: string;
  className?: string;
}
const CustomLink: FC<Props> = ({ href, title, className }) => (
  <a
    href={href}
    className={`text-gray-600 hover:text-blue-500 ${className}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {title}
  </a>
);

export default CustomLink;
