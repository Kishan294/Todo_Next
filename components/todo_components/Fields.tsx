"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface Props {
  fetchTodos: () => void
}

const Fields = ({ fetchTodos }: Props) => {
  const { data: session } = useSession()

  const [text, setText] = useState<string>("")
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (!session?.user) {
        alert("Field is mandatory")
        return
      } else if (!text) alert("kindly write your todo to add in databse")
      await fetch("/api/todos/new", {
        method: "POST",
        body: JSON.stringify({ todo: text, creator: session?.user?.id }),
      })

      setText("")
      fetchTodos()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Add To Do"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button onClick={(e) => onSubmit(e)}>Add</Button>
    </>
  )
}

export default Fields
