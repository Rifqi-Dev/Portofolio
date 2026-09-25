import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// `img` (a neon PNG) takes precedence over the FontAwesome `icon`.
function NeonContainer({
  url,
  icon,
  img,
  alt = "",
  className,
  imgClassName = "w-12 h-12",
}) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className={className}>
      {img ? (
        <img src={img} alt={alt} className={`${imgClassName} object-contain`} />
      ) : (
        <FontAwesomeIcon icon={icon} size="xl"></FontAwesomeIcon>
      )}
    </a>
  );
}

export default NeonContainer;
