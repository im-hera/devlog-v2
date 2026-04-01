import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';

interface ITextFilterProps {
  className?: string;
  enteredText?: string;
  onSubmit?: (value: string) => void;
}

const TextFilter: React.FC<ITextFilterProps> = ({
  className,
  onSubmit,
  enteredText
}) => {
  const [input, setInput] = useState<string>(enteredText || '');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setInput(enteredText || '');
  }, [enteredText]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.(input);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInput('');
    onSubmit?.('');
  };

  return (
    <div className={`text-filter-wrap ${className}`}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div
          className="dialog-trigger-group"
          data-entered={Boolean(enteredText && enteredText.length > 0)}
        >
          <Dialog.Trigger asChild>
            <button className="dialog-trigger-button" type="button">
              <BsSearch />
              {enteredText && <span>{enteredText}</span>}
            </button>
          </Dialog.Trigger>
          {enteredText && (
            <button
              className="text-filter-clearance"
              onClick={handleClickClear}
              type="button"
              aria-label="검색어 지우기"
            >
              <MdClear />
            </button>
          )}
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className={`dialog-overlay ${className}`} />
          <Dialog.Content
            className={`dialog-content text-filter-content ${className}`}
          >
            <div className="text-filter-input">
              <input
                type="text"
                placeholder="🔍 검색어를 입력하세요."
                maxLength={15}
                value={input}
                onChange={handleChangeInput}
                onKeyDown={handleKeydown}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default TextFilter;
