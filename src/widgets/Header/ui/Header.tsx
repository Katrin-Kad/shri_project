import React, { FC } from "react";
import "./header.css";
import { Button } from "../../../entities/Button";

export const Header: FC = () => {
    return (
        <div className="header">
            <p className="brand">Фильмопоиск</p>
            <Button />
        </div>
    );
}