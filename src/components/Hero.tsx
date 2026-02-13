
export const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 bg-gradient-to-b from-secondary to-white overflow-hidden">
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest text-primary/80 uppercase bg-white rounded-full shadow-sm border border-gray-100/50">
            Premium Mobile
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-8 leading-tight">
            Technology Meets <br />
            <span className="text-muted-foreground font-light">Elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Discover our curated selection of premium smartphones. 
            Quality, performance, and style in every device.
          </p>
        </div>
      </div>
    </section>
  );
};
