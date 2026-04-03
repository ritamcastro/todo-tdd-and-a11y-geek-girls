import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

const ToDo = () => {
  const [newItem, setNewItem] = useState(false)

  return (
    <>
      <div onClick={() => setNewItem(true)}>New</div>
      {newItem && <div>What needs to be done?</div>}
    </>
  )
}

if (rootContainer) {
  const root = createRoot(rootContainer)
  root.render(
    <StrictMode>
      <ToDo />
    </StrictMode>
  )
}
