import {
  Cpu, Shirt, Footprints, Dumbbell, Watch, BookOpen,
  Smartphone, Laptop, Sparkles, Home, Briefcase, Package,
} from "lucide-react";

const ICON_MAP = {
  electronics: Cpu,
  fashion: Shirt,
  clothing: Shirt,
  shirt: Shirt,
  jacket: Shirt,
  shoes: Footprints,
  footwear: Footprints,
  sports: Dumbbell,
  accessories: Watch,
  watches: Watch,
  books: BookOpen,
  mobiles: Smartphone,
  mobile: Smartphone,
  phones: Smartphone,
  laptops: Laptop,
  laptop: Laptop,
  beauty: Sparkles,
  home: Home,
  bag: Briefcase,
  bags: Briefcase,
};

export const getCategoryIcon = (name = "") => ICON_MAP[name.toLowerCase()] || Package;