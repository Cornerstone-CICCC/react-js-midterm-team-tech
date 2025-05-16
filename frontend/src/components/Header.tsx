import { Link, useNavigate } from 'react-router-dom';
import { Info, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from '../assets/LOGO.png';
import UserInfoModal from './UserInfoModal';

const Header = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    age: '',
    role: '',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get-user-cookie`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('No user');
        const data = await res.json();
        if (data && data.userId) {
          setUserId(data.userId);
          setIsAdmin(data.role === 'admin');
          // setUserInfo(data);
          console.log('User data:', data);
          fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${data.userId}`, {
            method: 'GET',
            credentials: 'include',
          })
            .then(res => res.json())
            .then((userData: any) => {
              setUserInfo(userData);
              setEditForm({
                username: userData.username || '',
                email: userData.email || '',
                age: userData.age?.toString() || '',
                role: userData.role || '',
              });
              console.log('User info:', userData);
            });
        } else {
          setUserId(null);
          setUserInfo(null);
        }
      })
      .catch(() => {
        setUserId(null);
        setUserInfo(null);
      });
  }, [navigate]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!userId) return;
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: editForm.username,
          email: editForm.email,
          age: Number(editForm.age),
          role: editForm.role,
        }),
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setUserInfo(updated);
      setIsEditing(false);
    } else {
      alert('Failed to update user info');
    }
  };

  return (
    <header className="relative z-50 w-full">
      <div className="absolute inset-0 h-20 bg-[radial-gradient(circle_at_10%_20%,rgba(255,192,203,0.3),transparent_70%),radial-gradient(circle_at_90%_80%,rgba(255,182,193,0.2),transparent_70%)] blur-2xl pointer-events-none" />

      <div className="relative bg-transparent px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Heart Logo"
            className="w-7 h-7 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              to="/admin"
              className="text-black-500 hover:text-pink-600 transition duration-300"
              aria-label="Admin page"
            >
              <span className="text-lg font-bold">
                <Info />
              </span>
            </Link>
          )}
          {userId && (
            <>
              <button
                onClick={() => setOpen(true)}
                className="text-black-500 hover:text-pink-600 transition duration-300"
                aria-label="Show user info"
              >
                <UserCircle className="w-8 h-8" />
              </button>
              <UserInfoModal
                userInfo={userInfo}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editForm={editForm}
                setEditForm={setEditForm}
                open={open}
                setOpen={setOpen}
                handleEditChange={handleEditChange}
                handleEditSave={handleEditSave}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
