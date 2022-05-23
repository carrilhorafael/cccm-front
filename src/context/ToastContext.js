import React, { useState, useEffect, createContext } from "react";

export const ToastContext = createContext()

export function ToastProvider ({children}) {

  const fireToast = (theme) => {

  }

  return (
    <ToastContext.Provider
      value={{fireToast}}
    >
      {children}
    </ToastContext.Provider>
  )
}
