
export const ButtonComponent = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
  >
    {children}
  </button>
);