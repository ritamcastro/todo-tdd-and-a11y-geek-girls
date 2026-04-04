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

  const onChangeItemText = (id: number, value: string) => {
    const updatedItems = items.map(item => (item.id === id ? { ...item, text: value } : item))

    setItems(updatedItems)
  }

  const onDeleteItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  const sortedItems = [...items].sort((a, b) => Number(a.isDone) - Number(b.isDone))

  return (
    <main>
      <button
        type="button"
        onClick={() => setItems([...items, { id: Date.now(), text: '', isDone: false }])}
      >
        New
      </button>
      <ul>
        {sortedItems.map(item => (
          <li key={item.id}>
            <input
              type={'checkbox'}
              checked={item.isDone}
              onChange={() => onToggleItem(item.id)}
            />
            {item.isDone ? (
              <del>{item.text}</del>
            ) : (
              <input
                type="text"
                placeholder="What needs to be done?"
                value={item.text}
                onChange={e => onChangeItemText(item.id, e.target.value)}
              />
            )}
            <button
              type="button"
              onClick={() => onDeleteItem(item.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </main>
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
