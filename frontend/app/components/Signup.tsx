import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";

interface SignupProps {
    isOpen: boolean;
    onClose: () => void;
    switchToLogin: () => void;
}

export default function Signup({ isOpen, onClose, switchToLogin }: SignupProps) {
    const [loading, setLoading] = useState(false);
    const [signupError, setSignupError] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSignupError(null);

        if (password !== confirmPassword) {
            setSignupError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!firstName || !lastName || !email || !phone || !address) {
            setSignupError("Please fill out all fields");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            onClose(); // Close the modal after successful signup
            setLoading(false);
        }, 1000);

        const requestBody = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phone,
            shipping_address: address,
            password: password
        }
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/api/user/create/", requestBody);
            if (response.status == 201) {
                setLoading(false)
                onClose();
                redirect('/')
            } else {
                setSignupError(response.data)
                setLoading(false);

            }
        } catch {
            setSignupError('An error occured. Please try again.')
            setLoading(false);
        }

    };

    return (
        <Modal show={isOpen} onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body className="rounded-lg bg-white p-6 dark:bg-gray-800">
                <div className="mx-auto w-full max-w-md">
                    <h1 className="mb-4 text-center text-2xl font-bold dark:text-white">Sign Up</h1>

                    <form onSubmit={handleSignup}>
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
                            <div className="w-full sm:w-1/2">
                                <Label htmlFor="firstName">First Name</Label>
                                <TextInput
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <TextInput
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>


                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <TextInput
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="phone">Phone Number</Label>
                            <TextInput
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="address">Shipping Address</Label>
                            <Textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <TextInput
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {signupError && <p className="mb-4 text-center text-red-500">{signupError}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>

                        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
                            Already registered?{" "}
                            <button
                                type="button"
                                onClick={switchToLogin}
                                className="text-primary-600 dark:text-primary-300"
                            >
                                Log in
                            </button>
                        </p>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
