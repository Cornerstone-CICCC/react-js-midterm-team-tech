import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// for girl type
type Girl = {
  id: number;
  name: string;
  age: number;
  height: number;
  location: string;
  price: number;
  imageUrl: string;
};

const initialGirls: Girl[] = [
  {
    id: 1,
    name: 'Emily',
    age: 22,
    height: 162,
    location: 'Toronto',
    price: 8000,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 2,
    name: 'Sophia',
    age: 24,
    height: 158,
    location: 'Vancouver',
    price: 7500,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 3,
    name: 'Olivia',
    age: 21,
    height: 165,
    location: 'Toronto',
    price: 9000,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 4,
    name: 'Ava',
    age: 23,
    height: 155,
    location: 'Montreal',
    price: 8500,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 5,
    name: 'Mia',
    age: 25,
    height: 160,
    location: 'Calgary',
    price: 7800,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 6,
    name: 'Charlotte',
    age: 20,
    height: 168,
    location: 'Toronto',
    price: 9500,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 7,
    name: 'Amelia',
    age: 26,
    height: 163,
    location: 'Ottawa',
    price: 8000,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 8,
    name: 'Ella',
    age: 23,
    height: 159,
    location: 'Montreal',
    price: 8200,
    imageUrl: '/api/placeholder/300/300',
  },
  {
    id: 9,
    name: 'Chloe',
    age: 24,
    height: 166,
    location: 'Toronto',
    price: 9200,
    imageUrl: '/api/placeholder/300/300',
  },
];

// location filter options
const locations = Array.from(new Set(initialGirls.map(girl => girl.location)));

export default function RentalGirlfriendList() {
  const [girls, setGirls] = useState<Girl[]>(initialGirls);
  const [nameFilter, setNameFilter] = useState('');
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [heightRange, setHeightRange] = useState([150, 175]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([5000, 12000]);

  // fliter
  useEffect(() => {
    let filteredGirls = initialGirls;

    // name filter
    if (nameFilter) {
      filteredGirls = filteredGirls.filter(girl =>
        girl.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // age filter
    filteredGirls = filteredGirls.filter(
      girl => girl.age >= ageRange[0] && girl.age <= ageRange[1]
    );

    // height filter
    filteredGirls = filteredGirls.filter(
      girl => girl.height >= heightRange[0] && girl.height <= heightRange[1]
    );

    // location filter
    if (locationFilter.length > 0) {
      filteredGirls = filteredGirls.filter(girl =>
        locationFilter.includes(girl.location)
      );
    }

    // fee filter
    filteredGirls = filteredGirls.filter(
      girl => girl.price >= priceRange[0] && girl.price <= priceRange[1]
    );

    setGirls(filteredGirls);
  }, [nameFilter, ageRange, heightRange, locationFilter, priceRange]);

  // switch location filter
  const toggleLocation = (location: string) => {
    if (locationFilter.includes(location)) {
      setLocationFilter(locationFilter.filter(loc => loc !== location));
    } else {
      setLocationFilter([...locationFilter, location]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Filter</h2>

        <div className="mb-6">
          <Label htmlFor="name-filter" className="block mb-2 font-medium">
            Name
          </Label>
          <Input
            id="name-filter"
            type="text"
            placeholder="Input name"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Age filter */}
        <div className="mb-6">
          <Label className="block mb-2 font-medium">
            Age: {ageRange[0]} - {ageRange[1]}
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
            Height: {heightRange[0]} - {heightRange[1]}cm
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

        {/* Girls list */}
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
                    <p>Height: {girl.height}cm</p>
                    <p>Location: {girl.location}</p>
                    <p className="text-lg font-medium text-rose-500">
                      ¥{girl.price.toLocaleString()}/hour
                    </p>
                  </div>
                  <button className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No girls found matching the criteria. Please adjust the filter
            conditions.
          </div>
        )}
      </div>
    </div>
  );
}

const styles = `
  .pb-full {
    padding-bottom: 100%;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
