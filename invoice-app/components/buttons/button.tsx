import Link from "next/link";

const Button: React.FC<{
  href: string;
  aria_label: string;
  label: string;
  fromColor?: string;
  toColor?: string;
}> = ({
  href,
  aria_label,
  label,
  fromColor = "from-blue-400",
  toColor = "to-blue-600",
}) => {
  return (
    <Link
      href={href}
      aria-label={aria_label}
      className={`bg-gradient-to-br ${fromColor} ${toColor} hover:opacity-85 text-white font-bold py-2 px-4 rounded-md mt-4 flex items-center justify-center`}
    >
      {label}
    </Link>
  );
};

export default Button;
