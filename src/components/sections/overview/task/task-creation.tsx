import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { useProfileStore } from '@/store/useProfileStore';
import { Task } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { completeQuest } from '@/utils/questCompletionHandler';
import { addActivity } from '@/utils/userActivityHandler'; // Import the activity handler

interface TaskCreationProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskCreation: React.FC<TaskCreationProps> = ({ isOpen, onClose }) => {
  const { addTask } = useProfileStore();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Task title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      const newTask: Task = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        points: 0,
        status: 'Not Started',
        taskType: 'manual',
      };
      addTask(newTask);
      toast({
        title: "Task Created",
        description: `Task "${values.title}" has been successfully created.`,
      });

      // Log the task creation activity
      addActivity({
        type: 'task',
        action: 'create',
        datetime: new Date().toISOString(),
        details: values.title,
      });

      // Complete the "Create Your First Task" quest
      completeQuest(3);

      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Task Title</label>
          <input
            type="text"
            {...formik.getFieldProps('title')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            {...formik.getFieldProps('description')}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>
        <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
          Save Task
        </Button>
      </form>
    </Modal>
  );
};

export default TaskCreation;