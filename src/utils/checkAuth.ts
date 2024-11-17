import { onAuthStateChanged, User, IdTokenResult } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

// Define a fallback user object structure
const defaultUser: User = {
  uid: "",
  email: "",
  emailVerified: false,
  displayName: "",
  phoneNumber: null,
  photoURL: null,
  providerData: [],
  refreshToken: "",
  tenantId: null,
  metadata: {
    creationTime: "",
    lastSignInTime: "",
  },
  getIdToken: async () => "", 
  getIdTokenResult: async (): Promise<IdTokenResult> => ({
    token: "",
    expirationTime: "",
    claims: {},
    issuedAtTime: "",
    signInProvider: "",
    signInSecondFactor: null,
    authTime: "", 
  }),
  reload: async () => { },
  toJSON: () => ({}),
  isAnonymous: false,
  delete: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  providerId: ""
};

const useCheckAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        setUser(defaultUser);
        setIsAuthenticated(false);
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { user, isAuthenticated, loading };
};

export default useCheckAuth;
