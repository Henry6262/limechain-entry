import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProfileStore } from '@/store/useProfileStore';
import { Task } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { completeQuest } from '@/lib/handler-quest-completion';
import { addActivity } from '@/lib/handler-user-activity';
import Modal from '@/components/common/modal';

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

      addActivity({
        type: 'task',
        action: 'create',
        datetime: new Date().toISOString(),
        details: values.title,
      });

      completeQuest(3);

      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}  title="Create New Task">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className='text-black dark:text-white' htmlFor="title">Task Title</Label>
          <Input
            id="title"
            type="text"
            {...formik.getFieldProps('title')}
            className={formik.touched.title && formik.errors.title ? "border-destructive" : ""}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-sm text-destructive">{formik.errors.title}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className='text-black dark:text-white' htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...formik.getFieldProps('description')}
            className={formik.touched.description && formik.errors.description ? "border-destructive" : ""}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-sm text-destructive">{formik.errors.description}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Save Task
        </Button>
      </form>
    </Modal>
  );
};

export default TaskCreation;