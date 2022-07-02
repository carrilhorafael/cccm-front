import React, { Component, createContext, useContext, useState } from 'react';
import { Toast } from '../atomics/Toast';

const OverlayContext = createContext({})

const OverlayProvider = ({ children }) => {
  const [modalState, setModalState] = useState({ visible: false, Component: null })
  const [toastState, setToastState] = useState({ visible: false })

  const showModal = (ModalComponent, props) => {
    // console.log(ModalComponent, props)
    setModalState({
      visible: true,
      Component: () => (
        <ModalComponent {...props}/>
      )
    })
  }

  const closeModal = () => {
    setModalState({
      visible: false,
      Component: null
    })
  }

  const fireToast = (theme, message) => {
    setToastState({
      visible: true,
      theme: theme,
      message: message
    })
    setTimeout(() => {
      setToastState({
        visible: false
      })
    }, 10000);
  }

  return (
    <OverlayContext.Provider
      value={{
        modalState,
        showModal,
        closeModal,
        fireToast
      }}
    >
      {modalState.visible && <modalState.Component/>}
      {children}
      {toastState.visible && <Toast theme={toastState.theme} message={toastState.message}/> }
    </OverlayContext.Provider>
  )
}

const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  return context;
}

export {useOverlayContext, OverlayProvider}
