import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

// Girl data type
type Girl = {
  id: number;
  name: string;
  age: number;
  height: number;
  location: string;
  price: number;
  imageUrl: string;
  introduction: string;
  availability: string;
};

// Sample data
const initialGirls: Girl[] = [
  {
    id: 1,
    name: 'Sakura',
    age: 22,
    height: 162,
    location: 'Tokyo',
    price: 8000,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Hi, I'm Sakura! I love shopping and watching movies. Let's have a great time together!",
    availability: 'Mon-Fri, 12:00-20:00',
  },
  {
    id: 2,
    name: 'Mio',
    age: 24,
    height: 158,
    location: 'Yokohama',
    price: 7500,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Hello! I'm Mio. I enjoy art galleries and quiet cafes. I'd love to share these experiences with you.",
    availability: 'Weekends, 10:00-18:00',
  },
  {
    id: 3,
    name: 'Ayaka',
    age: 21,
    height: 165,
    location: 'Tokyo',
    price: 9000,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "I'm Ayaka! I'm a university student who loves outdoor activities. Let's create wonderful memories together!",
    availability: 'Tue-Sun, 14:00-22:00',
  },
  {
    id: 4,
    name: 'Reina',
    age: 23,
    height: 155,
    location: 'Osaka',
    price: 8500,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Reina here! I'm passionate about music and food. I can show you the best spots in Osaka!",
    availability: 'Mon-Sat, 13:00-21:00',
  },
  {
    id: 5,
    name: 'Yuka',
    age: 25,
    height: 160,
    location: 'Nagoya',
    price: 7800,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Hey there! I'm Yuka. I love karaoke and theme parks. Let's have some fun together!",
    availability: 'Wed-Sun, 11:00-19:00',
  },
  {
    id: 6,
    name: 'Mai',
    age: 20,
    height: 168,
    location: 'Tokyo',
    price: 9500,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Hi, I'm Mai! I'm a fashion enthusiast and love trying new restaurants. Looking forward to meeting you!",
    availability: 'Mon-Fri, 15:00-23:00',
  },
  {
    id: 7,
    name: 'Haruka',
    age: 26,
    height: 163,
    location: 'Fukuoka',
    price: 8000,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Hello, I'm Haruka! I enjoy beaches and hot springs. Let me show you around Fukuoka!",
    availability: 'Tue-Sun, 12:00-20:00',
  },
  {
    id: 8,
    name: 'Nana',
    age: 23,
    height: 159,
    location: 'Osaka',
    price: 8200,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "I'm Nana! I love comedy shows and street food. Looking forward to laughing together!",
    availability: 'Wed-Mon, 14:00-22:00',
  },
  {
    id: 9,
    name: 'Aoi',
    age: 24,
    height: 166,
    location: 'Tokyo',
    price: 9200,
    imageUrl: '/api/placeholder/300/300',
    introduction:
      "Aoi here! I'm into photography and hiking. Let's explore the city together!",
    availability: 'Thu-Tue, 11:00-19:00',
  },
];

// Available locations list
const locations = Array.from(new Set(initialGirls.map(girl => girl.location)));

export default function RentalGirlfriendList() {
  // State management
  const [girls, setGirls] = useState<Girl[]>(initialGirls);
  const [nameFilter, setNameFilter] = useState('');
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [heightRange, setHeightRange] = useState([150, 175]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([5000, 12000]);

  // Profile view state
  const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Apply filters
  useEffect(() => {
    let filteredGirls = initialGirls;

    // Filter by name
    if (nameFilter) {
      filteredGirls = filteredGirls.filter(girl =>
        girl.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by age
    filteredGirls = filteredGirls.filter(
      girl => girl.age >= ageRange[0] && girl.age <= ageRange[1]
    );

    // Filter by height
    filteredGirls = filteredGirls.filter(
      girl => girl.height >= heightRange[0] && girl.height <= heightRange[1]
    );

    // Filter by location
    if (locationFilter.length > 0) {
      filteredGirls = filteredGirls.filter(girl =>
        locationFilter.includes(girl.location)
      );
    }

    // Filter by price
    filteredGirls = filteredGirls.filter(
      girl => girl.price >= priceRange[0] && girl.price <= priceRange[1]
    );

    setGirls(filteredGirls);
  }, [nameFilter, ageRange, heightRange, locationFilter, priceRange]);

  // Toggle location filter
  const toggleLocation = (location: string) => {
    if (locationFilter.includes(location)) {
      setLocationFilter(locationFilter.filter(loc => loc !== location));
    } else {
      setLocationFilter([...locationFilter, location]);
    }
  };

  // Open profile view
  const openProfile = (girl: Girl) => {
    setSelectedGirl(girl);
    setIsProfileOpen(true);
  };

  // Handle rent now button
  const handleRentNow = () => {
    setIsRentalModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Filter sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Filter</h2>

        {/* Name filter */}
        <div className="mb-6">
          <Label htmlFor="name-filter" className="block mb-2 font-medium">
            Name
          </Label>
          <Input
            id="name-filter"
            type="text"
            placeholder="Enter name"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Age filter */}
        <div className="mb-6">
          <Label className="block mb-2 font-medium">
            Age: {ageRange[0]} - {ageRange[1]} years
          </Label>
          <Slider
            defaultValue={ageRange}
            min={18}
            max={30}
            step={1}
            onValueChange={setAgeRange}
            className="mb-2"
          />
        </div>

        {/* Height filter */}
        <div className="mb-6">
          <Label className="block mb-2 font-medium">
            Height: {heightRange[0]} - {heightRange[1]} cm
          </Label>
          <Slider
            defaultValue={heightRange}
            min={150}
            max={175}
            step={1}
            onValueChange={setHeightRange}
            className="mb-2"
          />
        </div>

        {/* Location filter */}
        <div className="mb-6">
          <Label className="block mb-2 font-medium">Location</Label>
          <div className="space-y-2">
            {locations.map(location => (
              <div key={location} className="flex items-center">
                <input
                  type="checkbox"
                  id={`location-${location}`}
                  checked={locationFilter.includes(location)}
                  onChange={() => toggleLocation(location)}
                  className="mr-2"
                />
                <label htmlFor={`location-${location}`}>{location}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div className="mb-6">
          <Label className="block mb-2 font-medium">
            Price: ¥{priceRange[0].toLocaleString()} - ¥
            {priceRange[1].toLocaleString()}
          </Label>
          <Slider
            defaultValue={priceRange}
            min={5000}
            max={12000}
            step={500}
            onValueChange={setPriceRange}
            className="mb-2"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Girls List</h1>

        {/* Girls listing */}
        {girls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {girls.map(girl => (
              <div
                key={girl.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative pb-full">
                  <img
                    src={girl.imageUrl}
                    alt={girl.name}
                    className="absolute w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{girl.name}</h3>
                  <div className="mt-2 space-y-1 text-gray-600">
                    <p>Age: {girl.age}</p>
                    <p>Height: {girl.height} cm</p>
                    <p>Location: {girl.location}</p>
                    <p className="text-lg font-medium text-rose-500">
                      ¥{girl.price.toLocaleString()} / hour
                    </p>
                  </div>
                  <button
                    onClick={() => openProfile(girl)}
                    className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No girls found matching your criteria. Please adjust your filter
            settings.
          </div>
        )}
      </div>

      {/* Profile View Dialog */}
      {selectedGirl && (
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="w-full max-w-lg md:max-w-4xl p-0 bg-gray-50 flex flex-col md:flex-row !rounded-lg">
            <div className="flex flex-col md:flex-row h-full w-full">
              <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center">
                <div className="rounded-full overflow-hidden w-40 h-40 md:w-64 md:h-64 border-2 border-black mx-auto">
                  <img
                    src={selectedGirl.imageUrl}
                    alt={selectedGirl.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-6 md:mt-8 space-y-3 w-full max-w-xs mx-auto text-sm md:text-base">
                  <div className="flex">
                    <span className="font-semibold w-24 md:w-32">NAME:</span>
                    <span>{selectedGirl.name}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-24 md:w-32">AGE:</span>
                    <span>{selectedGirl.age}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-24 md:w-32">
                      LOCATION:
                    </span>
                    <span>{selectedGirl.location}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-24 md:w-32">PRICE:</span>
                    <span>¥{selectedGirl.price.toLocaleString()} / hour</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-24 md:w-32">
                      AVAILABILITY:
                    </span>
                    <span>{selectedGirl.availability}</span>
                  </div>
                </div>

                <button
                  onClick={handleRentNow}
                  className="mt-6 md:mt-8 bg-black text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-gray-800 transition-colors w-full max-w-xs"
                >
                  RENT NOW
                </button>
              </div>

              <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
                  SELF INTRODUCTION
                </h3>
                <div className="bg-gray-200 p-3 md:p-4 rounded min-h-32 md:min-h-40 border border-gray-400 text-sm md:text-base">
                  <p>{selectedGirl.introduction}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rental Date Modal */}
      <Dialog open={isRentalModalOpen} onOpenChange={setIsRentalModalOpen}>
        <DialogContent className="w-full max-w-xs sm:max-w-md p-4 sm:p-6">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <DialogClose className="h-4 w-4">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <DialogTitle className="text-center text-lg sm:text-xl font-bold mb-2 sm:mb-4">
            AVAILABLE DATE: {selectedDate?.toLocaleDateString() || '...'}
          </DialogTitle>
          <div className="py-2 sm:py-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between mt-4">
            <button
              onClick={() => setIsRentalModalOpen(false)}
              className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                setIsRentalModalOpen(false);
                alert(
                  'Booking confirmed for ' + selectedDate?.toLocaleDateString()
                );
              }}
              className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              CHECKOUT
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Square image style
const styles = `
  .pb-full {
    padding-bottom: 100%;
  }
`;

// Add style to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
