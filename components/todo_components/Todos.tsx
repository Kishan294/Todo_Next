import React, { useState } from "react"
import { ObjectId } from "mongoose"
import { useSession } from "next-auth/react"

import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

interface todo {
  _id: ObjectId
  todo: string
  creator: ObjectId
}

interface Props {
  todo: todo
  index: number
  fetchTodos: () => void
}

const Todos = ({ todo, index, fetchTodos }: Props) => {
  const { data: session } = useSession()
  const [checked, setChecked] = useState(false)
  const handleDelete = async (todo: todo) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if (hasConfirmed) {
      try {
        await fetch(`/api/todos/${todo._id.toString()}`, {
          method: "DELETE",
        })
        fetchTodos()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      {session?.user?.id === todo.creator && (
        <>
          <Alert
            key={index}
            className={`flex gap-3 justify-between items-center ${
              checked && "border-green-400"
            }`}
          >
            <div className="flex space-x-2 items-center">
              <Checkbox
                onCheckedChange={() => setChecked((prev) => !prev)}
                id={`checked${index}`}
              />
              <label htmlFor={`checked${index}`}>
                <AlertDescription
                  className={`text-lg ${
                    checked && "line-through"
                  } cursor-pointer `}
                >
                  {todo.todo}
                </AlertDescription>
              </label>
            </div>
            <Button onClick={() => handleDelete(todo)}>Delete</Button>{" "}
          </Alert>
        </>
      )}
    </>
  )
}

export default Todos
