import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import Cookies from "js-cookie";
import { authService, LoginResponse } from "../services/auth.service";

// Definiciones de tipos para el contexto de autenticación (Francisca)
interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshSession: () => Promise<string | null>;
    error: string | null;
}

// Crear contexto de autenticación (Francisca)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Variables para los nombres de las cookies (Francisca)
const AUTH_COOKIE_NAME = "auth_token";
const REFRESH_COOKIE_NAME = "refresh_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función de refrescar token (Francisca)
    const refreshSession = useCallback(async (): Promise<string | null> => {
        const refreshToken = Cookies.get(REFRESH_COOKIE_NAME);
        if (!refreshToken) {
            logout();
            return null;
        }

        try {
            const data = await authService.refreshToken(refreshToken);
            Cookies.set(AUTH_COOKIE_NAME, data.access_token, {
                secure: true,
                sameSite: "strict",
            });
            Cookies.set(REFRESH_COOKIE_NAME, data.refresh_token, {
                secure: true,
                sameSite: "strict",
            });
            return data.access_token;
        } catch (err) {
            logout();
            return null;
        }
    }, []);

    // Comprobar si existen cookies para mantener la sesión (Francisca)
    useEffect(() => {
        const initAuth = async () => {
            const token = Cookies.get(AUTH_COOKIE_NAME);
            const refreshToken = Cookies.get(REFRESH_COOKIE_NAME);

            // Función interna para chequear si un JWT ha expirado (Francisca)
            const isTokenExpired = (t: string) => {
                try {
                    const parts = t.split(".");
                    if (parts.length < 2 || !parts[1]) {
                        return true;
                    }
                    const payload = JSON.parse(atob(parts[1]));
                    const now = Math.floor(Date.now() / 1000);
                    return payload.exp < now;
                } catch {
                    return true;
                }
            };

            if (token && !isTokenExpired(token)) {
                // Token existe y es válido (Francisca)
                setIsAuthenticated(true);
            } else if (refreshToken) {
                // No hay token o está caducado, pero hay refresh (Francisca)
                console.log(
                    "🔄 Token caducado o ausente. Intentando refresh...",
                );
                const newToken = await refreshSession();
                if (newToken) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                // No hay nada
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        initAuth();
    }, [refreshSession]);

    // Lógica del log in utilizando authServices y cookies (Francisca)
    const login = async (email: string, password: string) => {
        setError(null);
        try {
            const data: LoginResponse = await authService.login(
                email,
                password,
            );

            Cookies.set(AUTH_COOKIE_NAME, data.access_token, {
                expires: 1,
                secure: true,
                sameSite: "strict",
            }); // Cookie de autenticación (Francisca)
            Cookies.set(REFRESH_COOKIE_NAME, data.refresh_token, {
                expires: 3,
                secure: true,
                sameSite: "strict",
            }); // Refresh Cookie (Francisca)

            setIsAuthenticated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
            throw err;
        }
    };

    // Cierre de sesión y eliminación de cookies (Francisca)
    const logout = () => {
        Cookies.remove(AUTH_COOKIE_NAME);
        Cookies.remove(REFRESH_COOKIE_NAME);
        setIsAuthenticated(false);
        window.location.href = "/area-privada/login";
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                login,
                logout,
                error,
                refreshSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook para el uso del contexto (Francisca)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};
