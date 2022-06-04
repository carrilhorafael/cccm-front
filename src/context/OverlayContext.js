import React, { Component, createContext, useContext, useState } from 'react';

const OverlayContext = createContext({})

const OverlayProvider = ({ children }) => {
  const [modalState, setModalState] = useState({ visible: false, Component: null })

  const showModal = (ModalComponent, props) => {
    console.log(ModalComponent, props)
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

  const fireToast = () => {

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
    </OverlayContext.Provider>
  )
}

const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  return context;
}

export {useOverlayContext, OverlayProvider}
