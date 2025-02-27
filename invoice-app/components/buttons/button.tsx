import Link from "next/link";

const Button: React.FC<{
  href?: string;
  aria_label: string;
  label: string;
  fromColor?: string;
  toColor?: string;
  disabled?: boolean;
  onClick?: () => void;
}> = ({
  href,
  aria_label,
  label,
  fromColor = "from-blue-400",
  toColor = "to-blue-600",
  disabled = false,
  onClick,
}) => {
  const commonClasses = `bg-gradient-to-br ${fromColor} ${toColor} hover:opacity-85 text-white font-bold py-2 px-4 rounded-md mt-4 flex items-center justify-center`;

  return href ? (
    <Link
      href={!disabled ? href : ""}
      aria-label={aria_label}
      className={`${commonClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </Link>
  ) : (
    <button
      onClick={onClick}
      aria-label={aria_label}
      className={`${commonClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
