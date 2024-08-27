"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimationArrayType, SortingAlgorithmType } from "../lib/types";
import {
  generateRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
  MIN_ANIMATION_SPEED,
} from "../lib/utils";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: (animations: AnimationArrayType) => void;
  requiresReset: boolean;
}

// Thanks Tapas Adhikary for this video https://youtu.be/yijn4ZIBxVA

// Context API, in React, is a way to pass data down through a component tree
// without having to pass props down through every level. Context is information
// that is globally available (partially or totally). This can be very helpful since
// this allows us to share data between components that are not directly related
// to each other (e.g., between sibling components).

// Provider -> the component that gives the data.
// Consumer -> the component that receives the data.

// All the consumers or children that need the data that the provider gives will
// be wrapped in the context provider.

// The consumers can access the data using the useContext hook.

// React context provides data to components no matter how deep they are in the
// components tree. The context is used to manage global data, e.g. global state,
// theme, services, user settings, and more.

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children, }: { children: React.ReactNode; }) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("merge");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED / 1.6);
  const [isAnimationComplete, setIsAnimationComplete] =useState<boolean>(false);

  const requiresReset = isAnimationComplete || isSorting;

  // to reset when the component renders
  // or if the window resizes
  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);

    // to clean up the listener
    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    }

  }, [])

  const resetArrayAndAnimation = () => {
    let current_line_colour_css = selectedAlgorithm !== "commie" ? "default-line-color" : "commie-line-color";

    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);

    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
    }

    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);

    // we have to clear the setTimeouts
    // settings zero, puts the event at the
    // end of the end queue.

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i > 0; i--) {
        window.clearTimeout(i);  
      }
    }, 0);

    setTimeout(() => {
      const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < arrayLines.length; i++) {
        arrayLines[i].classList.remove("change-line-color");
        arrayLines[i].classList.add(current_line_colour_css);
      }
    }, 0);
  };

  const runAnimation = (animations: AnimationArrayType) => {
    let current_line_colour_css = selectedAlgorithm !== "commie" ? "default-line-color" : "commie-line-color";

    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (indexes: number[], addClassName: string, removeClassName: string) => {
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      });
    }

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined,
    ) => {
      if (newHeight == undefined) return;
      
      arrayLines[lineIndex].style.height = `${newHeight}px`
    }

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, "change-line-color", current_line_colour_css)

          setTimeout(() => {
            updateClassList(values, current_line_colour_css, "change-line-color")            
          }, inverseSpeed)
        } else {
          const [lineIndex, newHeight] = values;
          updateHeightValue(lineIndex, newHeight);
        }

      }, index * inverseSpeed)
    })

    const finalTimout = animations.length * inverseSpeed;

    setTimeout(() => {
      Array.from(arrayLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove(current_line_colour_css);
      })

      setTimeout(() => {
        Array.from(arrayLines).forEach((line) => {
          line.classList.remove("pulse-animation", "change-line-color");
          line.classList.add(current_line_colour_css);
        })
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 1000);

    }, finalTimout);
  };

  const value = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requiresReset,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);
  if (context === undefined) {
    throw new Error(
      "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
    );
  }
  return context;
};
