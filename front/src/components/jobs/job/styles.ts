import React from "react";

export const siteHeader = {
    border: '1px solid rgb(235, 237, 240)',
}

export const container = {
    maxWidth: 1180,
    width: '100%',
    height: '100%',
    border: '1px solid rgb(235, 237, 240)',
    margin: "2%  auto",
    fontSize: 16,
    background: '#FAFAFA'
}

export const header = {
    maxWidth: 1180,
    width: '100%',
    height: '100%',
    margin: "2%  auto",
    fontSize: 16,
}

export const forTags = {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    listStylePosition: 'inside',
    padding: 0,
} as React.CSSProperties

export const forTagsItem = {
    float: 'left',
    margin: '0 10px 10px 0',
    padding: '0 10px',
    background: '#69C17E',
    borderRadius: '10px'
} as React.CSSProperties



export const infoRow = {
    display: 'flex',
    margin: "0 0 20px",
    padding: '0 0 5px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderBottom: "1px solid rgb(235, 237, 240)"
} as React.CSSProperties

export const info = {
    display: 'block',
    textAlign: 'left',
} as React.CSSProperties

export const infoTop = {
    fontWeight: "bold",
}
export const infoBot = {
    margin: 0,
    fontWeight: "lighter",
    fontSize: 13
}

export const content = {
    padding: "16px 24px"
}
export const forButton = {
    marginLeft: "10px"
}

export const forDescription = {
    marginBottom: '2em',
    paddingBottom: '1em',
    borderBottom: "1px solid rgb(235, 237, 240)"
}