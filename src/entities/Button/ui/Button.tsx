import React, { FC, useState } from "react";
import "./button.css"
import { AuthModal } from "../../Modal/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import "../../../shared/icon/account.png"
import { setAuthenticated } from "../../../store/slice/auth";
import { removeAuthToken } from "../../../shared/auth/auth";

export const Button: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAuthenticated = useSelector((state: unknown) => {
        if (typeof state === 'object' && state !== null) {
          return (state as { auth: { isAuthenticated: boolean } }).auth.isAuthenticated;
        }
        return false; 
      });
    const dispatch = useDispatch();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        removeAuthToken();
        dispatch(setAuthenticated(false)); 
    };
    
    if (isAuthenticated){
        return (
            <div className="auth">
                <div>
                    <img className="icon" src="https://s10.gifyu.com/images/Sr5ge.png"/>
                </div>
                <button className="button-exit" onClick={handleLogout}>Выйти</button>
            </div>
        )
    }
    return (
        <>
            <button className="button" onClick={openModal}>Войти</button>
            {isModalOpen && <AuthModal onClose={closeModal} />}
        </>
    );
}