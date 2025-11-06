const taskmodel = require("../models/taskmodel")



exports.addtask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    // Get userId from authenticated user
    const userId = req.user.id;

    const newTask = new taskmodel({
      title,
      description,
      status,
      dueDate,
      userId, // attach userId from JWT
    });

    await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.gettask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // only fetch tasks for logged-in user
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.gettask=async(req,res)=>{
    try{
        const tasks=await taskmodel.find()
        return res.status(200).json(tasks)
    }
    catch(err){
       console.error("❌ gettask error:", err)
        return res.status(500).json({message:`server error ${err.message}`})
    }
}

exports.updatetask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating Task ID:", id);
    console.log("Body:", req.body);

    const { title, description, status, dueDate } = req.body;

    const updatedtask = await taskmodel.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedtask)
      return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({
      message: "Successfully updated task",
      data: updatedtask,
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: `Server error ${err.message}` });
  }
};


exports.deletetask=async(req,res)=>{
    try{
    const {id}=req.params
    console.log(id)
        const deletedtask=await taskmodel.findByIdAndDelete(id)
   
    if(!deletedtask)
            return res.status(404).json({message:" task not found"})
    return res.status(200).json({message:"success",data:deletedtask})

}
    catch(err){
          console.error("Delete task error:", err);
        return res.status(500).json({message:`server error ${err.message}`})
    }
}

