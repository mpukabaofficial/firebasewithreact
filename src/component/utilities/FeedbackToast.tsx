interface Props {
  message: string;
  onClose: () => void;
}

const FeedbackToast = ({ message, onClose }: Props) => {
  return (
    <div className="absolute right-0 top-0 m-4 rounded border bg-white p-2 shadow">
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FeedbackToast;
