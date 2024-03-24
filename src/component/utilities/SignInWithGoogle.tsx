import { FaGoogle } from "react-icons/fa";
import { useUserAuth } from "../../context/useUserAuth";
import { FirebaseError } from "firebase/app";

interface Props {
  onSetRedirect: (redirect: boolean) => void;
  onSetError: (error: string) => void;
}

const SignInWithGoogle = ({ onSetError, onSetRedirect }: Props) => {
  const { signInWithGoogle } = useUserAuth();
  async function handleGoogleLogin(): Promise<void> {
    onSetError("");
    try {
      await signInWithGoogle();
      onSetRedirect(true);
    } catch (err) {
      if (err instanceof FirebaseError) onSetError(err.message);
    }
  }
  return (
    <button
      onClick={handleGoogleLogin}
      className="mx-auto mt-10 hidden items-center justify-center gap-2 rounded-xl border px-2 py-1 text-sm text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-300 xl:flex"
    >
      <FaGoogle />
      <span>Sign in with Google</span>
    </button>
  );
};

export default SignInWithGoogle;
