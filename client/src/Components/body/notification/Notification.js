import React from 'react'

export const showErrorMessage = (msg) => {
    return <div className="err">{msg}</div>
}

export const showSuccessMessage = (msg) => {
    return <div className="suc">{msg}</div>
}