
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const ProductCard = ({ name, price, description, imageUrl }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-none shadow-none hover:shadow-xl transition-all duration-300 bg-white">
      <div className="aspect-[4/5] overflow-hidden bg-secondary relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <Badge variant="secondary" className="font-medium">
            ${price.toLocaleString()}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};
