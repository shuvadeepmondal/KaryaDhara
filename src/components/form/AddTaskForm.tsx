import { useState } from "react"


export default function AddTaskForm() {
  const[title,setTitle] = useState('');
  const[description,setDescription]= useState('');
  // const[dueDate,setDueDate]= useState<Date | null>(null);
  // const[priority,setPriority] = useState();

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(title.trim()){
      // onAddTask({
      //   title: title.trim(), description,priority,dueDate,
      //   incompleted: false
      // });
      setTitle("");
      setDescription('');
    //   setPriority('medium');
    //   setDueDate('null');
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover relative">
      <div className="bg-white bg-opacity-5 backdrop-blur-md p-5 rounded-3xl max-w-md w-full shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-5 ">Add Your <span className="text-purple-500">Task</span></h2>
        <form>
            <div className=" flex flex-col gap-2 mb-2">
             <label htmlFor="title" className="block  text-sm font-medium ml-2">Task Title</label>
              <input 
                id="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-black rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
                placeholder="Enter Your Task Title"
                required
              />
               <label htmlFor="description" className="block  text-sm font-medium ml-2">Task Description</label>
               <textarea 
                id="description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-3 py-1.5 text-black rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
                placeholder="Enter Your Task Description"
                rows={3}
                required
               />
               </div>
               <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="priority" className="block  text-sm  font-medium ml-2">Choose Priority</label>
                <select
                 id="priority"
                //  value={priority}
                //  onChange={(e)=>setPriority(e.target.value)}
                 className="px-3 py-2 rounded-2xl text-black border focus:outline-none focus:ring focus:ring-purple-500">
                <option value="low" className="text-black bg-transparent">Low</option>
                <option value="medium" className="text-black bg-transparent">Medium</option>
                <option value="high" className="text-black bg-transparent">High</option>
                </select>
                </div>
            <div className="flex flex-col gap-2 ml-1">
               <label htmlFor="dueDate" className="block  text-sm font-medium ml-1">Due Date</label>
               <input
                id="dueDate"
                // value={dueDate}
                type="date"
                // onChange={(e)=>setDueDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 text-black rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
                />
            </div>
        </form>
        <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-purple-500 text-white py-2 hover:bg-purple-700 transition rounded-2xl mt-5"
      >
        Add Task
      </button>
      </div>
    </div>
  )
}
