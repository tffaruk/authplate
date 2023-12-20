import { useFormStatus } from "react-dom";
const SubmitButton = ({
  label,
  className,
  pending_label,
}: {
  label: string;
  className: string;
  pending_label: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn btn-primary ${className}`}
      aria-disabled={pending}
  
    >
      {pending ? pending_label : label}
    </button>
  );
};
export default SubmitButton;
