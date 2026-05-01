interface SVGIconProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
}

const SVGIcon = ({ lightSrc, darkSrc, alt, className = "h-10 w-10" }: SVGIconProps) => {
  return (
    <>
      <img 
        src={lightSrc} 
        alt={alt} 
        className={`${className} dark:hidden transform scale-125`} 
      />
      <img 
        src={darkSrc} 
        alt={alt} 
        className={`${className} hidden dark:block transform scale-125`} 
      />
    </>
  );
};

export default SVGIcon;