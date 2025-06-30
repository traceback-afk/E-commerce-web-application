import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import axios from "axios";
import { useWebContext } from "../context/Context";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    switchToSignup: () => void;
}

export default function Login({ isOpen, onClose, switchToSignup }: LoginProps) {
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLogin } = useWebContext();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLoginError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/token/', {
                email,
                password,
            });

            const token = response.data.token;

            if (token) {
                
                localStorage.setItem('token', token);
                onClose()
                window.location.reload();
            } else {
                setLoginError("Login failed: No token received.");
            }
            setIsLogin(true);

        } catch (error: any) {
            setLoginError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body className="rounded-lg bg-white p-6 dark:bg-gray-800">
                <div className="mx-auto w-full max-w-md">
                    <h1 className="mb-4 text-center text-2xl font-bold dark:text-white">Log in</h1>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <Label htmlFor="username">Your Email</Label>
                            <TextInput
                                id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="password">Your password</Label>
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {loginError && <p className="mb-4 text-center text-red-500">{loginError}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <button
                                type="button"
                                onClick={switchToSignup}
                                className="text-primary-600 dark:text-primary-300"
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
