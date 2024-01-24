interface Props {
  setUrl: (url: string) => void;
}

const TextInput = ({ setUrl }: Props) => {
  return (
    <input
      type="text"
      onChange={(event) => setUrl(event.target.value)}
      className="mt-1 w-1/2"
    />
  );
};
export default TextInput;
