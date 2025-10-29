// Exercise Library Data
const exerciseLibrary = {
  cardio: [
    { id: 1, name: "Running", duration: "30 min", calories: 300 },
    { id: 2, name: "Cycling", duration: "45 min", calories: 400 },
    { id: 3, name: "Jump Rope", duration: "15 min", calories: 200 },
    { id: 4, name: "Burpees", duration: "10 min", calories: 150 },
    { id: 5, name: "Mountain Climbers", duration: "10 min", calories: 120 },
  ],
  strength: [
    { id: 6, name: "Push-Ups", sets: "3x15", calories: 100 },
    { id: 7, name: "Squats", sets: "3x20", calories: 150 },
    { id: 8, name: "Lunges", sets: "3x12", calories: 120 },
    { id: 9, name: "Plank", sets: "3x1 min", calories: 80 },
    { id: 10, name: "Bicep Curls", sets: "3x12", calories: 90 },
  ],
  yoga: [
    { id: 11, name: "Downward Dog", duration: "5 breaths", calories: 30 },
    { id: 12, name: "Warrior II", duration: "10 breaths", calories: 40 },
    { id: 13, name: "Tree Pose", duration: "8 breaths", calories: 35 },
    { id: 14, name: "Child's Pose", duration: "10 breaths", calories: 20 },
    { id: 15, name: "Sun Salutation", duration: "5 rounds", calories: 100 },
  ],
};

// Sample meal data
const meals = {
  breakfast: [
    {
      name: "Oatmeal with Berries",
      calories: 250,
      carbs: 45,
      protein: 8,
      fat: 5,
    },
    { name: "Scrambled Eggs", calories: 180, carbs: 2, protein: 12, fat: 14 },
  ],
  lunch: [
    {
      name: "Grilled Chicken Salad",
      calories: 320,
      carbs: 10,
      protein: 25,
      fat: 18,
    },
    { name: "Quinoa Bowl", calories: 280, carbs: 35, protein: 10, fat: 8 },
  ],
  dinner: [
    {
      name: "Salmon with Vegetables",
      calories: 400,
      carbs: 15,
      protein: 30,
      fat: 22,
    },
  ],
  snacks: [
    { name: "Apple", calories: 95, carbs: 25, protein: 0, fat: 0 },
    { name: "Greek Yogurt", calories: 120, carbs: 6, protein: 15, fat: 4 },
  ],
};

// Sample data for charts
const statsData = {
  day: {
    steps: [1200, 1800, 2200, 1900, 2500, 3000, 2800],
    calories: [150, 220, 280, 240, 320, 380, 350],
  },
  week: {
    steps: [8500, 9200, 7800, 10500, 9800, 11200, 9500],
    calories: [2100, 2350, 1950, 2650, 2450, 2850, 2250],
  },
  month: {
    steps: [285000, 292000, 278000, 305000, 298000, 312000, 295000],
    calories: [85200, 87500, 83400, 91500, 89400, 93600, 88500],
  },
};
