import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import clipImage from '../assets/clip.svg'
import clipboardIcon from '../assets/clipboard.svg'
import './main.css'
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
    <>
      <div className="cb-header">
        <img
          alt="Clipboard"
          src={clipboardIcon}
          height="60"
          width="60"
        />
        Geek Girls To-Do
      </div>
      <main className="cb-page">
        <button
          className="cb-btn"
          type="button"
          onClick={() => setItems([...items, { id: Date.now(), text: '', isDone: false }])}
        >
          New
        </button>
        <ul>
          {sortedItems.map(item => (
            <li
              key={item.id}
              className="cb-item"
            >
              <input
                type={'checkbox'}
                checked={item.isDone}
                onChange={() => onToggleItem(item.id)}
              />
              {item.isDone ? (
                <del className="cb-done">{item.text}</del>
              ) : (
                <input
                  className="cb-input"
                  type="text"
                  placeholder="What needs to be done?"
                  value={item.text}
                  onChange={e => onChangeItemText(item.id, e.target.value)}
                />
              )}
              <button
                className="cb-btn"
                type="button"
                onClick={() => onDeleteItem(item.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </main>
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
