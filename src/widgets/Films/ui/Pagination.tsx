import React from "react";
import "./Pagination.css"


export const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const decrement = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }
    };
    
    const increment = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
    };
    return (
        <div>
            <button className="btn" onClick = {decrement} disabled = {currentPage === 1}>&#60;</button>
            <p className="page">{currentPage}</p>
            <button className="btn" onClick = {increment} disabled = {currentPage === totalPages}>&#62;</button>
        </div>
    )
}