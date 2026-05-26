const productImages =
require("./productImages");

const getRandom = (arr,fallback) => {

if(!arr || arr.length===0){

return fallback;

}

return arr[
Math.floor(Math.random()*arr.length)
];

};

module.exports = {

// ================= FOOD =================

Food:[

{
name:"Burger",
price:120,
images:productImages.Burger,
image:getRandom(productImages.Burger)
},

{
name:"Pizza",
price:250,
images:productImages.Pizza,
image:getRandom(productImages.Pizza)
},

{
name:"Pasta",
price:180,
images:productImages.Pasta,
image:getRandom(productImages.Pasta)
},

{
name:"French Fries",
price:90,
images:productImages.FrenchFries,
image:getRandom(productImages.FrenchFries)
},

{
name:"Sandwich",
price:80,
images:productImages.Sandwich,
image:getRandom(productImages.Sandwich)
},

{
name:"Fried Rice",
price:150,
images:productImages.FriedRice,
image:getRandom(productImages.FriedRice)
},

{
name:"Chicken Wings",
price:220,
images:productImages.ChickenWings,
image:getRandom(productImages.ChickenWings)
},

{
name:"Ice Cream",
price:100,
images:productImages.IceCream,
image:getRandom(productImages.IceCream)
},

{
name:"Donut",
price:60,
images:productImages.Donut,
image:getRandom(productImages.Donut)
},

{
name:"Cold Coffee",
price:130,
images:productImages.ColdCoffee,
image:getRandom(productImages.ColdCoffee)
}

],

// ================= GROCERIES =================

Groceries:[

{
name:"Tomato",
price:30,
images:productImages.Tomato,
image:getRandom(productImages.Tomato)
},

{
name:"Rice",
price:60,
images:productImages.Rice,
image:getRandom(productImages.Rice)
},

{
name:"Milk",
price:45,
images:productImages.Milk,
image:getRandom(productImages.Milk)
},

{
name:"Bread",
price:40,
images:productImages.Bread,
image:getRandom(productImages.Bread)
},

{
name:"Eggs",
price:72,
images:productImages.Eggs,
image:getRandom(productImages.Eggs)
},

{
name:"Sugar",
price:50,
images:productImages.Sugar,
image:getRandom(productImages.Sugar)
},

{
name:"Oil",
price:120,
images:productImages.Oil,
image:getRandom(productImages.Oil)
},

{
name:"Potato",
price:35,
images:productImages.Potato,
image:getRandom(productImages.Potato)
},

{
name:"Onion",
price:45,
images:productImages.Onion,
image:getRandom(productImages.Onion)
},

{
name:"Apple",
price:180,
images:productImages.Apple,
image:getRandom(productImages.Apple)
}

],


// ================= FASHION =================

Fashion:[

{
name:"T-Shirt",
price:799,
images:productImages.TShirt,
image:getRandom(productImages.TShirt)
},

{
name:"Jeans",
price:1499,
images:productImages.Jeans,
image:getRandom(productImages.Jeans)
},

{
name:"Hoodie",
price:1999,
images:productImages.Hoodie,
image:getRandom(productImages.Hoodie)
},

{
name:"Jacket",
price:2499,
images:productImages.Jacket,
image:getRandom(productImages.Jacket)
},

{
name:"Sneakers",
price:2999,
images:productImages.Sneakers,
image:getRandom(productImages.Sneakers)
},

{
name:"Cap",
price:499,
images:productImages.Cap,
image:getRandom(productImages.Cap)
},

{
name:"Watch",
price:3999,
images:productImages.Watch,
image:getRandom(productImages.Watch)
},

{
name:"Handbag",
price:2499,
images:productImages.Handbag,
image:getRandom(productImages.Handbag)
},

{
name:"Sunglasses",
price:999,
images:productImages.Sunglasses,
image:getRandom(productImages.Sunglasses)
},

{
name:"Shoes",
price:1899,
images:productImages.Shoes,
image:getRandom(productImages.Shoes)
}

],


// ================= ELECTRONICS =================

Electronics:[

{
name:"iPhone",
price:75000,
images:productImages.iPhone,
image:getRandom(productImages.iPhone)
},

{
name:"Laptop",
price:65000,
images:productImages.Laptop,
image:getRandom(productImages.Laptop)
},

{
name:"Headphones",
price:2999,
images:productImages.Headphones,
image:getRandom(productImages.Headphones)
},

{
name:"Keyboard",
price:1999,
images:productImages.Keyboard,
image:getRandom(productImages.Keyboard)
},

{
name:"Mouse",
price:999,
images:productImages.Mouse,
image:getRandom(productImages.Mouse)
},

{
name:"Smart Watch",
price:4999,
images:productImages.SmartWatch,
image:getRandom(productImages.SmartWatch)
},

{
name:"Monitor",
price:15000,
images:productImages.Monitor,
image:getRandom(productImages.Monitor)
},

{
name:"Speaker",
price:3999,
images:productImages.Speaker,
image:getRandom(productImages.Speaker)
},

{
name:"Power Bank",
price:1499,
images:productImages.PowerBank,
image:getRandom(productImages.PowerBank)
},

{
name:"Camera",
price:25000,
images:productImages.Camera,
image:getRandom(productImages.Camera)
}

],

// ================= MEDICAL =================

Medical:[

{
name:"Paracetamol",
price:20,
images:productImages.Paracetamol,
image:getRandom(productImages.Paracetamol)
},

{
name:"Vitamin Tablets",
price:120,
images:productImages.VitaminTablets,
image:getRandom(productImages.VitaminTablets)
},

{
name:"Cough Syrup",
price:95,
images:productImages.CoughSyrup,
image:getRandom(productImages.CoughSyrup)
},

{
name:"Face Mask",
price:50,
images:productImages.FaceMask,
image:getRandom(productImages.FaceMask)
},

{
name:"Hand Sanitizer",
price:75,
images:productImages.HandSanitizer,
image:getRandom(productImages.HandSanitizer)
},

{
name:"Thermometer",
price:250,
images:productImages.Thermometer,
image:getRandom(productImages.Thermometer)
},

{
name:"Bandage",
price:40,
images:productImages.Bandage,
image:getRandom(productImages.Bandage)
},

{
name:"First Aid Kit",
price:550,
images:productImages.FirstAidKit,
image:getRandom(productImages.FirstAidKit)
},

{
name:"Glucose Powder",
price:180,
images:productImages.GlucosePowder,
image:getRandom(productImages.GlucosePowder)
},

{
name:"Pain Relief Spray",
price:199,
images:productImages.PainReliefSpray,
image:getRandom(productImages.PainReliefSpray)
}

],


// ================= BOOKS =================

Books:[

{
name:"Harry Potter",
price:599,
images:productImages.HarryPotter,
image:getRandom(productImages.HarryPotter)
},

{
name:"The Alchemist",
price:399,
images:productImages.TheAlchemist,
image:getRandom(productImages.TheAlchemist)
},

{
name:"Atomic Habits",
price:499,
images:productImages.AtomicHabits,
image:getRandom(productImages.AtomicHabits)
},

{
name:"Rich Dad Poor Dad",
price:450,
images:productImages.RichDadPoorDad,
image:getRandom(productImages.RichDadPoorDad)
},

{
name:"Think and Grow Rich",
price:420,
images:productImages.ThinkAndGrowRich,
image:getRandom(productImages.ThinkAndGrowRich)
},

{
name:"Ikigai",
price:350,
images:productImages.Ikigai,
image:getRandom(productImages.Ikigai)
},

{
name:"Deep Work",
price:550,
images:productImages.DeepWork,
image:getRandom(productImages.DeepWork)
},

{
name:"Psychology of Money",
price:520,
images:productImages.PsychologyOfMoney,
image:getRandom(productImages.PsychologyOfMoney)
},

{
name:"Wings of Fire",
price:299,
images:productImages.WingsOfFire,
image:getRandom(productImages.WingsOfFire)
},

{
name:"Power of Now",
price:480,
images:productImages.PowerOfNow,
image:getRandom(productImages.PowerOfNow)
}

],

// ================= BEAUTY =================

Beauty:[

{
name:"Lipstick",
price:799,
images:productImages.Lipstick,
image:getRandom(productImages.Lipstick)
},

{
name:"Face Wash",
price:399,
images:productImages.FaceWash,
image:getRandom(productImages.FaceWash)
},

{
name:"Perfume",
price:2499,
images:productImages.Perfume,
image:getRandom(productImages.Perfume)
},

{
name:"Shampoo",
price:599,
images:productImages.Shampoo,
image:getRandom(productImages.Shampoo)
},

{
name:"Conditioner",
price:699,
images:productImages.Conditioner,
image:getRandom(productImages.Conditioner)
},

{
name:"Foundation",
price:1299,
images:productImages.Foundation,
image:getRandom(productImages.Foundation)
},

{
name:"Face Cream",
price:499,
images:productImages.FaceCream,
image:getRandom(productImages.FaceCream)
},

{
name:"Nail Polish",
price:299,
images:productImages.NailPolish,
image:getRandom(productImages.NailPolish)
},

{
name:"Hair Dryer",
price:2499,
images:productImages.HairDryer,
image:getRandom(productImages.HairDryer)
},

{
name:"Makeup Kit",
price:3999,
images:productImages.MakeupKit,
image:getRandom(productImages.MakeupKit)
}

],


// ================= SPORTS =================

Sports:[

{
name:"Cricket Bat",
price:2499,
images:productImages.CricketBat,
image:getRandom(productImages.CricketBat)
},

{
name:"Football",
price:899,
images:productImages.Football,
image:getRandom(productImages.Football)
},

{
name:"Basketball",
price:1199,
images:productImages.Basketball,
image:getRandom(productImages.Basketball)
},

{
name:"Tennis Racket",
price:3299,
images:productImages.TennisRacket,
image:getRandom(productImages.TennisRacket)
},

{
name:"Badminton Kit",
price:1499,
images:productImages.BadmintonKit,
image:getRandom(productImages.BadmintonKit)
},

{
name:"Sports Shoes",
price:3999,
images:productImages.SportsShoes,
image:getRandom(productImages.SportsShoes)
},

{
name:"Gym Gloves",
price:699,
images:productImages.GymGloves,
image:getRandom(productImages.GymGloves)
},

{
name:"Dumbbells",
price:2599,
images:productImages.Dumbbells,
image:getRandom(productImages.Dumbbells)
},

{
name:"Yoga Mat",
price:999,
images:productImages.YogaMat,
image:getRandom(productImages.YogaMat)
},

{
name:"Skipping Rope",
price:399,
images:productImages.SkippingRope,
image:getRandom(productImages.SkippingRope)
}

],


// ================= FURNITURE =================

Furniture:[

{
name:"Sofa",
price:24999,
images:productImages.Sofa,
image:getRandom(productImages.Sofa)
},

{
name:"Dining Table",
price:18999,
images:productImages.DiningTable,
image:getRandom(productImages.DiningTable)
},

{
name:"Chair",
price:3499,
images:productImages.Chair,
image:getRandom(productImages.Chair)
},

{
name:"Bed",
price:29999,
images:productImages.Bed,
image:getRandom(productImages.Bed)
},

{
name:"Wardrobe",
price:22999,
images:productImages.Wardrobe,
image:getRandom(productImages.Wardrobe)
},

{
name:"Bookshelf",
price:7999,
images:productImages.Bookshelf,
image:getRandom(productImages.Bookshelf)
},

{
name:"Study Table",
price:9999,
images:productImages.StudyTable,
image:getRandom(productImages.StudyTable)
},

{
name:"TV Stand",
price:6999,
images:productImages.TVStand,
image:getRandom(productImages.TVStand)
},

{
name:"Coffee Table",
price:5999,
images:productImages.CoffeeTable,
image:getRandom(productImages.CoffeeTable)
},

{
name:"Recliner",
price:15999,
images:productImages.Recliner,
image:getRandom(productImages.Recliner)
}

],


// ================= TOYS =================

Toys:[

{
name:"Teddy Bear",
price:799,
images:productImages.TeddyBear,
image:getRandom(productImages.TeddyBear)
},

{
name:"Toy Car",
price:499,
images:productImages.ToyCar,
image:getRandom(productImages.ToyCar)
},

{
name:"Building Blocks",
price:999,
images:productImages.BuildingBlocks,
image:getRandom(productImages.BuildingBlocks)
},

{
name:"Remote Car",
price:1499,
images:productImages.RemoteCar,
image:getRandom(productImages.RemoteCar)
},

{
name:"Barbie Doll",
price:899,
images:productImages.BarbieDoll,
image:getRandom(productImages.BarbieDoll)
},

{
name:"Puzzle Set",
price:699,
images:productImages.PuzzleSet,
image:getRandom(productImages.PuzzleSet)
},

{
name:"Action Figure",
price:1199,
images:productImages.ActionFigure,
image:getRandom(productImages.ActionFigure)
},

{
name:"Toy Train",
price:1399,
images:productImages.ToyTrain,
image:getRandom(productImages.ToyTrain)
},

{
name:"Lego Set",
price:2499,
images:productImages.LegoSet,
image:getRandom(productImages.LegoSet)
},

{
name:"Drone Toy",
price:3999,
images:productImages.DroneToy,
image:getRandom(productImages.DroneToy)
}

],

// ================= PET CARE =================

"Pet Care":[

{
name:"Dog Food",
price:899,
images:productImages.DogFood,
image:getRandom(productImages.DogFood)
},

{
name:"Cat Food",
price:799,
images:productImages.CatFood,
image:getRandom(productImages.CatFood)
},

{
name:"Pet Shampoo",
price:349,
images:productImages.PetShampoo,
image:getRandom(productImages.PetShampoo)
},

{
name:"Dog Collar",
price:299,
images:productImages.DogCollar,
image:getRandom(productImages.DogCollar)
},

{
name:"Cat Toy",
price:249,
images:productImages.CatToy,
image:getRandom(productImages.CatToy)
},

{
name:"Pet Bed",
price:1499,
images:productImages.PetBed,
image:getRandom(productImages.PetBed)
},

{
name:"Pet Bowl",
price:399,
images:productImages.PetBowl,
image:getRandom(productImages.PetBowl)
},

{
name:"Bird Cage",
price:2499,
images:productImages.BirdCage,
image:getRandom(productImages.BirdCage)
},

{
name:"Fish Tank",
price:4999,
images:productImages.FishTank,
image:getRandom(productImages.FishTank)
},

{
name:"Pet Carrier",
price:1899,
images:productImages.PetCarrier,
image:getRandom(productImages.PetCarrier)
}

],


// ================= AUTOMOTIVE =================

Automotive:[

{
name:"Car Tyre",
price:5999,
images:productImages.CarTyre,
image:getRandom(productImages.CarTyre)
},

{
name:"Helmet",
price:2499,
images:productImages.Helmet,
image:getRandom(productImages.Helmet)
},

{
name:"Car Cover",
price:1499,
images:productImages.CarCover,
image:getRandom(productImages.CarCover)
},

{
name:"Engine Oil",
price:899,
images:productImages.EngineOil,
image:getRandom(productImages.EngineOil)
},

{
name:"Seat Cover",
price:2999,
images:productImages.SeatCover,
image:getRandom(productImages.SeatCover)
},

{
name:"Car Perfume",
price:499,
images:productImages.CarPerfume,
image:getRandom(productImages.CarPerfume)
},

{
name:"Bike Gloves",
price:799,
images:productImages.BikeGloves,
image:getRandom(productImages.BikeGloves)
},

{
name:"Car Vacuum",
price:1999,
images:productImages.CarVacuum,
image:getRandom(productImages.CarVacuum)
},

{
name:"LED Lights",
price:999,
images:productImages.LEDLights,
image:getRandom(productImages.LEDLights)
},

{
name:"Bike Mirror",
price:699,
images:productImages.BikeMirror,
image:getRandom(productImages.BikeMirror)
}

],


// ================= BABY PRODUCTS =================

"Baby Products":[

{
name:"Baby Bottle",
price:399,
images:productImages.BabyBottle,
image:getRandom(
productImages.BabyBottle,
"https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=800&q=80"
)
},

{
name:"Baby Diapers",
price:899,
images:productImages.BabyDiapers,
image:getRandom(productImages.BabyDiapers)
},

{
name:"Baby Walker",
price:2999,
images:productImages.BabyWalker,
image:getRandom(productImages.BabyWalker)
},

{
name:"Baby Powder",
price:249,
images:productImages.BabyPowder,
image:getRandom(productImages.BabyPowder)
},

{
name:"Baby Soap",
price:149,
images:productImages.BabySoap,
image:getRandom(productImages.BabySoap)
},

{
name:"Baby Stroller",
price:7999,
images:productImages.BabyStroller,
image:getRandom(productImages.BabyStroller)
},

{
name:"Baby Dress",
price:699,
images:productImages.BabyDress,
image:getRandom(productImages.BabyDress)
},

{
name:"Baby Toy",
price:499,
images:productImages.BabyToy,
image:getRandom(productImages.BabyToy)
},

{
name:"Baby Blanket",
price:899,
images:productImages.BabyBlanket,
image:getRandom(productImages.BabyBlanket)
},

{
name:"Baby Chair",
price:3499,
images:productImages.BabyChair,
image:getRandom(productImages.BabyChair)
}

],


// ================= HOME ESSENTIALS =================

"Home Essentials":[

{
name:"Bucket",
price:249,
images:productImages.Bucket,
image:getRandom(
productImages.Bucket,
"https://images.unsplash.com/photo-1583947582886-f40ec95dd752?auto=format&fit=crop&w=800&q=80"
)
},

{
name:"Mop",
price:499,
images:productImages.Mop,
image:getRandom(productImages.Mop)
},

{
name:"Cleaning Brush",
price:199,
images:productImages.CleaningBrush,
image:getRandom(productImages.CleaningBrush)
},

{
name:"Dustbin",
price:799,
images:productImages.Dustbin,
image:getRandom(productImages.Dustbin)
},

{
name:"Laundry Basket",
price:999,
images:productImages.LaundryBasket,
image:getRandom(productImages.LaundryBasket)
},

{
name:"Water Bottle",
price:399,
images:productImages.WaterBottle,
image:getRandom(productImages.WaterBottle)
},

{
name:"Wall Clock",
price:899,
images:productImages.WallClock,
image:getRandom(productImages.WallClock)
},

{
name:"Curtains",
price:1499,
images:productImages.Curtains,
image:getRandom(productImages.Curtains)
},

{
name:"Bedsheet",
price:1299,
images:productImages.Bedsheet,
image:getRandom(productImages.Bedsheet)
},

{
name:"Mirror",
price:1999,
images:productImages.Mirror,
image:getRandom(productImages.Mirror)
}

],


// ================= ACCESSORIES =================

Accessories:[

{
name:"Bracelet",
price:799,
images:productImages.Bracelet,
image:getRandom(productImages.Bracelet)
},

{
name:"Wallet",
price:1499,
images:productImages.Wallet,
image:getRandom(productImages.Wallet)
},

{
name:"Ring",
price:999,
images:productImages.Ring,
image:getRandom(productImages.Ring)
},

{
name:"Necklace",
price:2499,
images:productImages.Necklace,
image:getRandom(productImages.Necklace)
},

{
name:"Earrings",
price:699,
images:productImages.Earrings,
image:getRandom(productImages.Earrings)
},

{
name:"Belt",
price:799,
images:productImages.Belt,
image:getRandom(productImages.Belt)
},

{
name:"Handbag",
price:1999,
images:productImages.HandbagAccessory,
image:getRandom(productImages.HandbagAccessory)
},

{
name:"Cap",
price:499,
images:productImages.CapAccessory,
image:getRandom(productImages.CapAccessory)
},

{
name:"Sunglasses",
price:899,
images:productImages.SunglassesAccessory,
image:getRandom(productImages.SunglassesAccessory)
},

{
name:"Watch",
price:3999,
images:productImages.WatchAccessory,
image:getRandom(productImages.WatchAccessory)
}

],


// ================= STATIONERY =================

Stationery:[

{
name:"Pen",
price:20,
images:productImages.Pen,
image:getRandom(productImages.Pen)
},

{
name:"Pencil",
price:10,
images:productImages.Pencil,
image:getRandom(productImages.Pencil)
},

{
name:"Notebook",
price:99,
images:productImages.Notebook,
image:getRandom(productImages.Notebook)
},

{
name:"School Bag",
price:999,
images:productImages.SchoolBag,
image:getRandom(productImages.SchoolBag)
},

{
name:"Scale",
price:25,
images:productImages.Scale,
image:getRandom(productImages.Scale)
},

{
name:"Eraser",
price:10,
images:productImages.Eraser,
image:getRandom(productImages.Eraser)
},

{
name:"Sharpener",
price:20,
images:productImages.Sharpener,
image:getRandom(productImages.Sharpener)
},

{
name:"Sketch Pen",
price:120,
images:productImages.SketchPen,
image:getRandom(productImages.SketchPen)
},

{
name:"Marker",
price:80,
images:productImages.Marker,
image:getRandom(productImages.Marker)
},

{
name:"Calculator",
price:499,
images:productImages.Calculator,
image:getRandom(productImages.Calculator)
}

],


// ================= GARDENING =================

Gardening:[

{
name:"Flower Pot",
price:299,
images:productImages.FlowerPot,
image:getRandom(productImages.FlowerPot)
},

{
name:"Garden Shovel",
price:499,
images:productImages.GardenShovel,
image:getRandom(productImages.GardenShovel)
},

{
name:"Water Can",
price:399,
images:productImages.WaterCan,
image:getRandom(productImages.WaterCan)
},

{
name:"Plant Seeds",
price:99,
images:productImages.PlantSeeds,
image:getRandom(productImages.PlantSeeds)
},

{
name:"Garden Gloves",
price:249,
images:productImages.GardenGloves,
image:getRandom(productImages.GardenGloves)
},

{
name:"Indoor Plant",
price:599,
images:productImages.IndoorPlant,
image:getRandom(productImages.IndoorPlant)
},

{
name:"Garden Hose",
price:899,
images:productImages.GardenHose,
image:getRandom(productImages.GardenHose)
},

{
name:"Fertilizer",
price:349,
images:productImages.Fertilizer,
image:getRandom(productImages.Fertilizer)
},

{
name:"Pruning Shear",
price:699,
images:productImages.PruningShear,
image:getRandom(productImages.PruningShear)
},

{
name:"Plant Stand",
price:1499,
images:productImages.PlantStand,
image:getRandom(productImages.PlantStand)
}

]

};