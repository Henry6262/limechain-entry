import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Edit2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { completeQuest } from '@/lib/handler-quest-completion';
import { addActivity } from '@/lib/handler-user-activity';
import * as Yup from 'yup';

interface ProfileInfoProps {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

export default function ProfileInfo({ name, email, setName, setEmail }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const profileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  useEffect(() => {
    setCurrentName(name);
    setCurrentEmail(email);
  }, [name, email]);

  const handleSaveProfile = async () => {
    try {
      await profileSchema.validate({ name: currentName, email: currentEmail }, { abortEarly: false });
      setErrors({});

      if (currentName !== name || currentEmail !== email) {
        completeQuest(1);
        addActivity({
          type: 'auth',
          action: 'update profile',
          datetime: new Date().toISOString(),
          details: `Name: ${currentName}, Email: ${currentEmail}`,
        });
        setName(currentName);
        setEmail(currentEmail);
      }
      setIsEditing(false);
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const validationErrorsMap: Record<string, string> = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            validationErrorsMap[error.path] = error.message;
          }
        });
        setErrors(validationErrorsMap);
      }
    }
  };

  return (
    <div className="relative flex items-center p-[5px] space-x-4 overflow-scroll">
      <Avatar className="w-20 h-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  className="mb-2"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <Input
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  placeholder="Your email"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="absolute top-[5px] right-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSaveProfile}
                  aria-label="Save profile"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="flex-1">
                <p className="text-lg font-semibold flex items-center">
                  <User className="mr-2 h-4 w-4" /> {name}
                </p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> {email}
                </p>
              </div>
              <div className="absolute  top-[-12px] right-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit profile"
                  className='!bg-transparent'
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}