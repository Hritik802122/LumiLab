import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  id?: string;
  labelLeft?: string;
  labelRight?: string;
}

const Toggle = ({ checked, onChange, ariaLabel, id, labelLeft, labelRight }: ToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      {labelLeft && <span className={clsx("text-sm", !checked ? "text-white font-semibold" : "text-slate-400")}>{labelLeft}</span>}
      <Switch
        id={id}
        checked={checked}
        onChange={onChange}
        className={clsx(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800',
          checked ? 'bg-violet-600' : 'bg-slate-600'
        )}
        aria-label={ariaLabel}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </Switch>
      {labelRight && <span className={clsx("text-sm", checked ? "text-white font-semibold" : "text-slate-400")}>{labelRight}</span>}
    </div>
  );
};

export default Toggle;