'use client'

import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'

export function QRCodeViewer() {
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Usando localhost para desenvolvimento
    const port = process.env.PORT || '3000'
    const localUrl = `http://localhost:${port}`
    setUrl(localUrl)
    setIsVisible(true)
  }, [])

  const toggleVisibility = () => setIsVisible(!isVisible)

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-lg shadow-lg z-50 text-sm"
      >
        Mostrar QR Code
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <button 
        onClick={toggleVisibility}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
      >
        ×
      </button>
      <p className="text-sm mb-2 font-medium">Acesse no celular:</p>
      <div className="p-2 bg-white">
        <QRCode 
          value={url}
          size={128}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 128 128`}
        />
      </div>
      <p className="text-xs mt-2 text-gray-500 break-all">{url}</p>
      <p className="text-xs text-gray-500 mt-1">
        Certifique-se que o celular está na mesma rede Wi-Fi
      </p>
    </div>
  )
} 