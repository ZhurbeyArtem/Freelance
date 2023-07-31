import React from "react";

const paginationPage = {
    maxWidth: 1180,
    padding: "0 10px",
    width: "100%",
    height: '100%',
    margin: '20px auto',
    flexWrap: 'wrap',
    display: 'flex',
} as React.CSSProperties

const forPagination = {
    margin: '10px auto',
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 70
} as React.CSSProperties


const forFilters = {
    maxWidth: 1180,
    padding: "0 10px",
    width: "100%",
    height: '100%',
    margin: '20px auto',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between'
} as React.CSSProperties

export {
    paginationPage,
    forPagination,
    forFilters
};
