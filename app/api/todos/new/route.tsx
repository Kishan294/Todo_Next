import Todos from "@/models/todos"

import connectToDb from "@/config/connectToDb"

const handler = async (req: Request) => {
  await connectToDb()

  const { todo, creator } = await req.json()

  if (req.method == "POST") {
    try {
      const newTodo = await new Todos({
        todo,
        creator,
      })

      await newTodo.save()
      return new Response(JSON.stringify(newTodo), { status: 201 })
    } catch (error) {
      console.log(error)
    }
  }
}

export { handler as POST }
