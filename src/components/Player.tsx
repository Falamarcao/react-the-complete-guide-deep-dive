import { FormEvent, useEffect, useRef, useState } from 'react';

interface PlayerProps {
  name: string;
  symbol: string;
}

const Player = ({ name, symbol }: PlayerProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditing && inputRef.current) setPlayerName(inputRef.current.value);

    setIsEditing((prevValue: boolean) => !prevValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={inputRef}
              defaultValue={playerName}
              required
            />
          </form>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};

export default Player;
