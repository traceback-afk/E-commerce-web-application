import { useState } from "react";
import Login from "./Login";  // Your login modal
import Signup from "./Signup"; // Your signup modal
import { Button, Modal } from "flowbite-react";

export default function AuthModal() {
    const [isLoginOpen, setIsLoginOpen] = useState(true); // Initially open login modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal visibility
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const switchToSignup = () => {
        setIsLoginOpen(false); // Switch to signup modal
    };

    const switchToLogin = () => {
        setIsLoginOpen(true); // Switch to login modal
    };

    return (
        <>

            <Button onClick={toggleModal} color="light" className="mr-2 ">
                Login / Signup
            </Button>
            {isModalOpen && (
                <Modal show={isModalOpen} onClose={closeModal} popup>
                    {isLoginOpen ? (
                        <Login isOpen={isModalOpen} onClose={closeModal} switchToSignup={switchToSignup} />
                    ) : (
                        <Signup isOpen={isModalOpen} onClose={closeModal} switchToLogin={switchToLogin} />
                    )}
                </Modal>
            )}
        </>
    );
}
