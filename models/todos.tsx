import { Schema, model, models } from "mongoose"

const TodosSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

const Todos = models.Todos || model("Todos", TodosSchema)

export default Todos
