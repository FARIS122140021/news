// pages/index.tsx
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    if (router.query.authMessage) {
      setAuthMessage(router.query.authMessage as string);
  
      // Clean up the URL
      router.replace("/", undefined, { shallow: true });
    }
  }, [router.query]);
  

  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.authBox}>
          <img src="/logofaris.png" alt="NewsLogo" className={styles.logo} />
          <p className={styles.description}>
            Faris The News Dibuat oleh Faris Pratama NIM 122140021<br></br>
            Silahkan Login menggunakan Akun Google
          </p>
  
          <button onClick={() => signIn("google")} className={styles.signInButton}>
            Sign in with Google
          </button>
  
          {authMessage && (
            <p className={styles.authMessage}>{authMessage}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <img src="/logofaris.png" alt="NewsLogo" className={styles.logo} />
        <h1 className={styles.title}>Selamat datang (welcome), {session.user?.name}!</h1>
        <p className={styles.description}>Kamu berhasil Login. Lanjutkan ke Faris The News?</p>
  
        <div className={styles.buttonGroup}>
          <button
            onClick={() => router.push("/news")}
            className={styles.primaryButton}
          >
            Go to News
          </button>
          <button
            onClick={() => signOut()}
            className={styles.secondaryButton}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
  
}
