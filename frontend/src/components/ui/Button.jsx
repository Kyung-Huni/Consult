export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded transition-all duration-200';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primaryHover',
    outline: 'border border-primary text-primary hover:bg-blue-50',
    ghost: 'text-primary hover:bg-blue-50',
    danger: 'bg-danger text-white hover:bg-dangerHover',
    dangerText: 'text-gray-400 hover:text-red-500 transition-colors',
    ghostText: 'text-primary hover:underline px-0 py-0',
    tab: 'rounded-none border-none bg-transparent px-0 py-0',
    favorite: 'border-none',
    disabled: 'bg-grayMuted text-white cursor-not-allowed',
  };

  const computed = [
    base,
    variant && variants[disabled ? 'disabled' : variant],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={computed}
    >
      {children}
    </button>
  );
}
