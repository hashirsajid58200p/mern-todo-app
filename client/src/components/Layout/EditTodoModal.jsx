import React, { useState } from "react";
import toast from "react-hot-toast";
import todoServices from "../../services/TodoService";
import { getErrorMessage } from "../../utils/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const EditTodoModal = ({ editingTask, onClose, getUserTask }) => {
  const [title, setTitle] = useState(editingTask?.title);
  const [description, setDescription] = useState(editingTask?.description);
  const [isCompleted, setIsCompleted] = useState(editingTask?.isCompleted);

  const handleClose = () => {
    onClose();
  };

  const id = editingTask?._id;

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData?.user?.id;
      const data = { title, description, createdBy, isCompleted };
      if (!title || !description) {
        return toast.error("Please provide title and description");
      }
      await todoServices.updateTodo(id, data);
      onClose();
      toast.success("Task Updated successfully");
      setTitle("");
      setDescription("");
      getUserTask();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={!!editingTask} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#111111] border border-[#1f1f1f] max-w-md p-6 text-white">
        <DialogHeader>
          <DialogTitle className="text-white font-semibold text-base">Update Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              type="text"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Description</label>
            <textarea
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600 min-h-[100px]"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Task description"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Status</label>
            <Select
              defaultValue={isCompleted ? "completed" : "incomplete"}
              onValueChange={(val) => setIsCompleted(val === "completed")}
            >
              <SelectTrigger className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border border-[#1f1f1f] text-white">
                <SelectItem value="incomplete" className="focus:bg-[#1f1f1f] focus:text-white">Incomplete</SelectItem>
                <SelectItem value="completed" className="focus:bg-[#1f1f1f] focus:text-white">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center border border-[#1f1f1f] hover:bg-[#1f1f1f] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            onClick={handleSubmit}
          >
            Update
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
