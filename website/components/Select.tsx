'use client';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { CaretDownIcon } from '@phosphor-icons/react/ssr';
import { useId, useRef, useState } from 'react';

import { FOCUS_ACTIVE_CLASSES } from '~/lib/style';
import { tw } from '~/lib/utils';

export type SelectOption<T extends string> = {
  disabled?: boolean;
  label: string;
  value: T;
};

type Props<T extends string> = {
  disabled?: boolean;
  labelledBy?: string;
  onChange: (value: T) => void;
  options: readonly SelectOption<T>[];
  value: T;
};

export default function Select<T extends string>({ disabled = false, labelledBy, onChange, options, value }: Props<T>) {
  const [open, setOpen] = useState(false);
  const [navigationActiveIndex, setNavigationActiveIndex] = useState<number | null>(null);
  const listRef = useRef<(HTMLButtonElement | null)[]>([]);
  const listId = useId();
  const selectedIndex = options.findIndex(option => option.value === value);
  const normalizedSelectedIndex = selectedIndex === -1 ? null : selectedIndex;
  const selectedOption = normalizedSelectedIndex === null ? undefined : options[normalizedSelectedIndex];
  const activeIndex = open ? (navigationActiveIndex ?? Math.max(selectedIndex, 0)) : null;

  const {
    refs: { setFloating, setReference },
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: nextOpen => {
      setOpen(nextOpen);

      if (!nextOpen) {
        setNavigationActiveIndex(null);
      }
    },
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ elements, rects }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const click = useClick(context, {
    event: 'mousedown',
    keyboardHandlers: true,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNavigation = useListNavigation(context, {
    activeIndex,
    listRef,
    loop: true,
    onNavigate: setNavigationActiveIndex,
    selectedIndex: normalizedSelectedIndex,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, dismiss, role, listNavigation]);

  return (
    <>
      <button
        ref={setReference}
        type="button"
        disabled={disabled}
        className={tw(
          'border-rule bg-paper-raised text-ink flex h-11.5 w-full cursor-pointer items-center justify-between gap-2 rounded-sm border px-3 py-0 text-sm shadow-xs transition-[border] select-none',
          'hover:border-pencil/50 disabled:cursor-not-allowed disabled:opacity-60 max-sm:h-11 max-sm:text-[12px]',
          FOCUS_ACTIVE_CLASSES
        )}
        {...getReferenceProps({
          'aria-controls': open ? listId : undefined,
          'aria-expanded': open,
          'aria-labelledby': labelledBy,
        })}>
        <span className="truncate text-left">{selectedOption?.label ?? 'Select an option'}</span>
        <CaretDownIcon
          weight="bold"
          className={tw(
            'text-muted shrink-0 transition-transform duration-150 ease-out',
            open && 'text-pencil rotate-180',
            disabled && 'text-muted/60'
          )}
          size={14}
        />
      </button>
      <FloatingPortal>
        <FloatingFocusManager
          context={context}
          disabled={!open}
          modal={false}
          initialFocus={activeIndex ?? 0}
          returnFocus>
          <div
            ref={setFloating}
            style={floatingStyles}
            data-open={open}
            aria-hidden={!open}
            inert={!open}
            className="select-list-wrapper border-rule bg-paper-raised z-20 overflow-hidden rounded-sm border p-1 shadow-lg focus:outline-0"
            {...getFloatingProps({
              id: listId,
            })}>
            <div className="scrollbar-thumb-muted max-h-90 scrollbar-thin scrollbar-track-transparent overflow-y-auto">
              {options.map((option, index) => {
                const isActive = index === activeIndex;
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    ref={node => {
                      listRef.current[index] = node;
                    }}
                    type="button"
                    className={tw(
                      'flex w-full cursor-pointer items-center rounded-sm px-3 py-2 text-left text-sm transition-colors outline-none',
                      option.disabled && 'text-muted/60 cursor-not-allowed',
                      !option.disabled && isActive && 'bg-pencil/12 dark:bg-active',
                      !option.disabled && isSelected
                        ? 'text-pencil font-semibold'
                        : !option.disabled && 'text-ink hover:bg-pencil/12 dark:hover:bg-active'
                    )}
                    tabIndex={isActive ? 0 : -1}
                    disabled={option.disabled}
                    {...getItemProps({
                      'aria-selected': isSelected,
                      onClick: () => {
                        if (option.disabled) {
                          return;
                        }
                        onChange(option.value);
                        setNavigationActiveIndex(null);
                        setOpen(false);
                      },
                      role: 'option',
                    })}>
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    </>
  );
}
