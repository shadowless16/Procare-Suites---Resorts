// Room data for dynamic loading
const roomsData = [
  {
    name: "Standard Room",
    price: 25000,
    images: ["img/standard room1.jpg", "img/standard room2.jpg"],
    description: "Cozy and affordable room with essential amenities, perfect for solo travelers or couples.",
    amenities: [
      { icon: "fas fa-wifi", label: "WiFi" },
      { icon: "fas fa-wind", label: "AC" },
      { icon: "fas fa-tv", label: "TV" },
      { icon: "fas fa-bath", label: "En-suite Bathroom" }
    ],
    bookingParam: "standard"
  },
  {
    name: "Deluxe Room",
    price: 35000,
    images: ["img/Deluxe1.jpg", "img/Deluxe2.jpg", "img/Deluxe3.jpg", "img/Deluxe4.jpg"],
    description: "Spacious room with extra amenities and a beautiful view.",
    amenities: [
      { icon: "fas fa-wifi", label: "WiFi" },
      { icon: "fas fa-wind", label: "AC" },
      { icon: "fas fa-tv", label: "TV" },
      { icon: "fas fa-coffee", label: "Breakfast" }
    ],
    bookingParam: "deluxe"
  },
  {
    name: "Classic Room",
    price: 40000,
    images: ["img/classic room1.jpg", "img/classic room2.jpg", "img/classic room3.jpg", "img/classic room4.jpg"],
    description: "Classic comfort with a queen-size bed and a relaxing atmosphere.",
    amenities: [
      { icon: "fas fa-wifi", label: "WiFi" },
      { icon: "fas fa-wind", label: "AC" },
      { icon: "fas fa-tv", label: "TV" },
      { icon: "fas fa-bath", label: "En-suite Bathroom" }
    ],
    bookingParam: "classic"
  },
  {
    name: "Executive Room",
    price: 45000,
    images: ["img/executive1.jpg", "img/executive2.jpg",],
    description: "Premium room with workspace and luxury amenities for business travelers.",
    amenities: [
      { icon: "fas fa-wifi", label: "WiFi" },
      { icon: "fas fa-wind", label: "AC" },
      { icon: "fas fa-tv", label: "TV" },
      { icon: "fas fa-briefcase", label: "Workspace" },
      { icon: "fas fa-coffee", label: "Breakfast" }
    ],
    bookingParam: "executive"
  },
  {
    name: "Super Executive Room",
    price: 50000,
    images: ["img/Super Executive1.jpg", "img/Super Executive2.jpg", "img/Super Executive3.jpg", "img/Super Executive4.jpg"],
    description: "Spacious suite with two queen-size beds, ideal for families or groups.",
    amenities: [
      { icon: "fas fa-wifi", label: "WiFi" },
      { icon: "fas fa-wind", label: "AC" },
      { icon: "fas fa-tv", label: "TV" },
      { icon: "fas fa-coffee", label: "Breakfast" }
    ],
    bookingParam: "super-executive"
  },
  {
    name: "2 Bedroom Apartment",
    priceOptions: [
      { label: "₦80,000", value: 80000 },
      { label: "₦110,000", value: 110000 }
    ],
    images: ["img/apartment1.jpg", "img/apartment2.jpg", "img/apartment3.jpg", "img/apartment4.jpg"],
    description: "Luxury 2-bedroom apartment with living area and kitchen. Choose your preferred price option.",
    amenities: [
      { icon: "fas fa-wifi", label: "WiFi" },
      { icon: "fas fa-wind", label: "AC" },
      { icon: "fas fa-tv", label: "TV" },
      { icon: "fas fa-users", label: "2 Bedrooms" },
      { icon: "fas fa-kitchen-set", label: "Kitchen" }
    ],
    bookingParam: "2bedroom"
  }
];
