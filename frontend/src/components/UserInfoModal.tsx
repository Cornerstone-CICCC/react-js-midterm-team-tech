import { Dialog, DialogContent, DialogTitle, DialogClose } from './ui/dialog';
import { X } from 'lucide-react';

interface UserInfoModalProps {
  userInfo: any;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  editForm: { username: string; email: string; age: string; role: string };
  setEditForm: (v: any) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  handleEditChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleEditSave: () => void;
}

const UserInfoModal = ({
  userInfo,
  isEditing,
  setIsEditing,
  editForm,
  open,
  setOpen,
  handleEditChange,
  handleEditSave,
}: UserInfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xs mx-auto p-6">
        <div className="flex justify-between items-center mb-2">
          <DialogTitle>User Info</DialogTitle>
          <DialogClose asChild>
            <button className="text-gray-400 hover:text-black"></button>
          </DialogClose>
        </div>
        {userInfo && (
          <div className="space-y-2 text-sm">
            {isEditing ? (
              <>
                <div>
                  <span className="font-semibold">Username:</span>{' '}
                  <input
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{' '}
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-semibold">Age:</span>{' '}
                  <input
                    name="age"
                    type="number"
                    value={editForm.age}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-semibold">Role:</span>{' '}
                  <select
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="client">client</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleEditSave}
                    className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="font-semibold">Username:</span>{' '}
                  {userInfo.username}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {userInfo.email}
                </div>
                <div>
                  <span className="font-semibold">Age:</span> {userInfo.age}
                </div>
                <div>
                  <span className="font-semibold">Role:</span> {userInfo.role}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoModal;
