import Todos from "@/models/todos"

import connectToDb from "@/config/connectToDb"

const handler = async () => {
  try {
    await connectToDb()
    const todos = await Todos.find()
    return new Response(JSON.stringify(todos), { status: 200 })
  } catch (error) {
    console.log(error)
  }
}

export { handler as GET }
