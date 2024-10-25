import mongoose from "mongoose";

//Defining Schema
const roleInstructioSchema = new mongoose.Schema({
  roleInstruction: { type: String, required: true, trim: true },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    //required:true
  }
})

// model
const roleInstructioModel = mongoose.model("RoleInstructio", roleInstructioSchema)

export default roleInstructioModel;