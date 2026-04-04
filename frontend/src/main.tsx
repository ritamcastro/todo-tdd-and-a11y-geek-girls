import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

type ToDoItem = {
  id: number
  text: string
}

const ToDo = () => {
  const [items, setItems] = useState<ToDoItem[]>([{ id: Date.now(), text: '' }])

  return (
    <>
      <button
        type="button"
        onClick={() => setItems([...items, { id: Date.now(), text: '' }])}
      >
        New
      </button>
      <div>
        {items.map(item => (
          <input
            key={item.id}
            type="text"
            placeholder="What needs to be done?"
          />
        ))}
      </div>
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
