import { AuthProvider } from "../../components/AuthProvider";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
    <AuthProvider>
      <Toaster position="top-right" />

      <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}