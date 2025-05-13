import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Types
interface GirlfriendData {
  id: string;
  name: string;
  age: number;
  location: string;
  availability: string;
  price: number;
  introduction: string;
  imageUrl: string;
}

const RentalGirlfriendAdmin = () => {
  // Sample initial data
  const initialData: GirlfriendData[] = [
    {
      id: '1',
      name: 'Yuki Tanaka',
      age: 22,
      location: 'Shibuya, Tokyo',
      availability: 'Weekends',
      price: 5000,
      introduction:
        'Hello! I love shopping and watching movies. I can be your perfect date for any occasion!',
      imageUrl: '',
    },
    {
      id: '2',
      name: 'Mika Suzuki',
      age: 24,
      location: 'Shinjuku, Tokyo',
      availability: 'Weekdays Evening',
      price: 6000,
      introduction:
        "I enjoy meaningful conversations and can help you practice your Japanese. Let's have a great time together!",
      imageUrl: '',
    },
    {
      id: '3',
      name: 'Airi Nakamura',
      age: 23,
      location: 'Ikebukuro, Tokyo',
      availability: 'Anytime',
      price: 7000,
      introduction:
        "I'm a university student who loves anime and gaming. I can join you for exhibitions or gaming sessions!",
      imageUrl: '',
    },
  ];

  const [girlfriends, setGirlfriends] = useState<GirlfriendData[]>(initialData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentGirlfriend, setCurrentGirlfriend] =
    useState<GirlfriendData | null>(null);
  const [formData, setFormData] = useState<GirlfriendData>({
    id: '',
    name: '',
    age: 20,
    location: '',
    availability: '',
    price: 0,
    introduction: '',
    imageUrl: '',
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle select changes
  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Open Add Dialog
  const openAddDialog = () => {
    setFormData({
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      age: 20,
      location: '',
      availability: 'Weekends',
      price: 5000,
      introduction: '',
      imageUrl: '',
    });
    setIsAddDialogOpen(true);
  };

  // Open Edit Dialog
  const openEditDialog = (girlfriend: GirlfriendData) => {
    setCurrentGirlfriend(girlfriend);
    setFormData({ ...girlfriend });
    setIsEditDialogOpen(true);
  };

  // Open Delete Dialog
  const openDeleteDialog = (girlfriend: GirlfriendData) => {
    setCurrentGirlfriend(girlfriend);
    setIsDeleteDialogOpen(true);
  };

  // Add new girlfriend
  const handleAdd = () => {
    setGirlfriends([...girlfriends, formData]);
    setIsAddDialogOpen(false);
  };

  // Update girlfriend
  const handleUpdate = () => {
    setGirlfriends(girlfriends.map(g => (g.id === formData.id ? formData : g)));
    setIsEditDialogOpen(false);
  };

  // Delete girlfriend
  const handleDelete = () => {
    setGirlfriends(girlfriends.filter(g => g.id !== currentGirlfriend?.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Rental Girlfriend Admin Panel</h1>
          <Button
            onClick={openAddDialog}
            className="bg-black text-white hover:bg-gray-800"
          >
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {girlfriends.map(girlfriend => (
            <Card
              key={girlfriend.id}
              className="bg-gray-50 hover:bg-white transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={girlfriend.imageUrl}
                        alt={girlfriend.name}
                      />
                      <AvatarFallback className="bg-gray-200">
                        {girlfriend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{girlfriend.name}</h3>
                      <p className="text-sm text-gray-500">
                        {girlfriend.age} yrs • {girlfriend.location} • ¥
                        {girlfriend.price.toLocaleString()}/hour
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openEditDialog(girlfriend)}
                      variant="outline"
                      className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => openDeleteDialog(girlfriend)}
                      variant="outline"
                      className="bg-white text-black border-black hover:bg-gray-100 rounded-full px-6"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Registration</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="availability">Availability</Label>
              <Select
                name="availability"
                value={formData.availability}
                onValueChange={value =>
                  handleSelectChange(value, 'availability')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anytime">Anytime</SelectItem>
                  <SelectItem value="Weekends">Weekends Only</SelectItem>
                  <SelectItem value="Weekdays">Weekdays Only</SelectItem>
                  <SelectItem value="Weekdays Evening">
                    Weekday Evenings
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (per hour / JPY)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="introduction">Introduction</Label>
              <Textarea
                id="introduction"
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-age">Age</Label>
              <Input
                id="edit-age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-availability">Availability</Label>
              <Select
                name="availability"
                value={formData.availability}
                onValueChange={value =>
                  handleSelectChange(value, 'availability')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anytime">Anytime</SelectItem>
                  <SelectItem value="Weekends">Weekends Only</SelectItem>
                  <SelectItem value="Weekdays">Weekdays Only</SelectItem>
                  <SelectItem value="Weekdays Evening">
                    Weekday Evenings
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price (per hour / JPY)</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-introduction">Introduction</Label>
              <Textarea
                id="edit-introduction"
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the profile of{' '}
              {currentGirlfriend?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RentalGirlfriendAdmin;
