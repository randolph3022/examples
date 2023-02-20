import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const examples = [
  "collatz",
  "comparison",
  "conditional",
  "fibonacci",
  "game-of-life-4x4",
  "nprime",
];

function classExamples(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type DropDownProps = {
  onExampleValueChange?: (newType: string) => void;
};

export default function DropDown({ onExampleValueChange }: DropDownProps): JSX.Element {
  const [selected, setSelected] = useState(examples[1]);

  return (
    <Listbox 
      value={selected}
      onChange={(value) => {
        onExampleValueChange?.(value);
        setSelected(value);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1" role="listbox" data-testid="listbox">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" role="options">
                {examples.map((examples) => (
                  <Listbox.Option
                    key={examples}
                    className={({ active }) =>
                      classExamples(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={examples}
                    data-testid="select-option"
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classExamples(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {examples}
                        </span>

                        {selected ? (
                          <span
                            className={classExamples(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
