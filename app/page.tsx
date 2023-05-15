"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

// import { todos } from "@/constants/data"

import Fields from "@/components/todo_components/Fields"
import Todos from "@/components/todo_components/Todos"



export default function IndexPage() {
  const { data: session } = useSession()
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("/api/todos", { method: "GET" })
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="mx-auto mt-28 flex w-2/3 flex-col items-center justify-center gap-2 lg:w-1/3 ">
      <div className="flex w-full items-center justify-center gap-2">
        <Fields fetchTodos={fetchTodos} />
      </div>

      <div className="mt-5 w-full space-y-2">
        {todos.map((todo, index) => (
          <Todos
            todo={todo}
            index={index}
            key={index}
            fetchTodos={fetchTodos}
          />
        ))}
      </div>
    </div>
  )
}
