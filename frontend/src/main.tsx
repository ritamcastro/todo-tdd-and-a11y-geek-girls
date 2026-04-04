import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

type ToDoItem = {
  id: number
  text: string
  isDone: boolean
}

const ToDo = () => {
  const [items, setItems] = useState<ToDoItem[]>([{ id: Date.now(), text: '', isDone: false }])

  const onToggleItem = (id: number) => {
    const updatedItems = items.map(item => {
      return item.id === id ? { ...item, isDone: !item.isDone } : item
    })
    setItems(updatedItems)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setItems([...items, { id: Date.now(), text: '', isDone: false }])}
      >
        New
      </button>
      <div>
        {items.map(item => (
          <div key={item.id}>
            <input
              type={'checkbox'}
              checked={item.isDone}
              onChange={() => onToggleItem(item.id)}
            />
            <input
              type="text"
              placeholder="What needs to be done?"
              style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
            />
          </div>
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
