interface OptionButtonProps {
  title: string;
  onClickHandler: (state: boolean) => void;
  icon: JSX.Element;
  styleString: string;
}

export default function OptionButton({
  title,
  onClickHandler,
  icon,
  styleString,
}: OptionButtonProps) {
  return (
    <button
      className={"text-white rounded px-1.5 py-1 m-1" + " " + styleString}
      title={title}
      onClick={() => onClickHandler(true)}
    >
      {icon}
    </button>
  );
}
