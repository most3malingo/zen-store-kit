
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-tight text-primary">
          Zona Store
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </nav>
  );
};
