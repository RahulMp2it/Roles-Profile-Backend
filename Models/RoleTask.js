import mongoose from "mongoose";

//Defining Schema
const roleTaskSchema = new mongoose.Schema({
  roleTask: { type: String, required: true, trim: true },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    //required:true
  }
})

// model
const roleTaskModel = mongoose.model("RoleTask", roleTaskSchema)

export default roleTaskModel;