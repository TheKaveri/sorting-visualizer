"use client";

import { useSortingAlgorithmContext } from "./context/Visualizer";
import { Slider } from "./components/Input/Slider";
import { Select } from "./components/Input/Select";
import { algorithmOptions, generateAnimationArray } from "./lib/utils";
import { SortingAlgorithmType } from "./lib/types";
import { RxReset } from "react-icons/rx";
import { FaPlayCircle } from "react-icons/fa";
import { InfoPanel } from "./components/Input/InfoPanel";

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    animationSpeed,
    setAnimationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  };

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }

    // generate the animation array
    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-[theme('colors.system.hotOrange40')] bg-[radial-gradient(#ffffff33_0.5px,theme('colors.system.hotOrange10')_0.5px)] bg-[size:20px_20px] ">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
        >
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-2xl font-light hidden md:flex">
              🚀 Sorting Visualizer
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Slider
                isDisabled={isSorting} // slider is disabled whenever the algorithm is running
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {requiresReset ? (
                  <RxReset className="text-gray-400 h-8 w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-8 w-8" />
                )}
              </button>
            </div>
            <div className="hidden sm:flex absolute top-[120%] left-0 w-full">
              <InfoPanel selectedAlgorithm={selectedAlgorithm} />
            </div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className={`array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg ${
                    selectedAlgorithm !== "commie"
                      ? "default-line-color"
                      : "commie-line-color"
                  }`}
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
