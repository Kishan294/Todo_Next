import Todos from "@/models/todos"
import { ObjectId } from "mongoose"

import connectToDb from "@/config/connectToDb"

interface Params {
  params: {
    id: ObjectId
  }
}

const handler = async (req: Request, { params }: Params) => {
  try {
    await connectToDb()
    await Todos.findByIdAndRemove(params.id)
    return new Response("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 })
  }
}

export { handler as DELETE }
