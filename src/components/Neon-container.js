import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NeonContainer({ url, icon, className }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className={className}>
      <FontAwesomeIcon icon={icon} size="xl"></FontAwesomeIcon>
    </a>
  );
}

export default NeonContainer;
