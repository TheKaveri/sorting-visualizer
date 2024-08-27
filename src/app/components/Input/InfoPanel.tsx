import { sortingAlgorithmsData } from "@/app/lib/utils";
import { SortingAlgorithmType } from "@/app/lib/types";

export const InfoPanel = ({
  selectedAlgorithm,
}: {
  selectedAlgorithm: SortingAlgorithmType;
}) => {
  return (
    <div className="flex w-full text-gray-400 p-4 rounded border border-system-hotOrange20 bg-system-hotOrange80 bg-opacity-10 gap-6">
      <div className="flex flex-col items-start justify-start w-3/4">
        <h3 className="text-lg">
          {sortingAlgorithmsData[selectedAlgorithm].title}
        </h3>
        <p className="text-sm text-grey-500 pt-2">
          {sortingAlgorithmsData[selectedAlgorithm].description}
        </p>
      </div>

      <div className="flex flex-col items-start justify-start w-1/4 gap-2">
        <h3 className="text-lg">Time Complexity</h3>
        <div className="flex flex-col gap-2">
          <InfoPanelHelper
            info={sortingAlgorithmsData[selectedAlgorithm].worstCase}
            title="Worst Case:"
          />
          <InfoPanelHelper
            info={sortingAlgorithmsData[selectedAlgorithm].averageCase}
            title="Average Case:"
          />
          <InfoPanelHelper
            info={sortingAlgorithmsData[selectedAlgorithm].bestCase}
            title="Best Case:"
          />
        </div>
      </div>
    </div>
  );
};

const InfoPanelHelper = ({ info, title }: { info: string; title: string }) => {
  return (
    <p className="flex w-full text-sm text-gray-500">
      <span className="w-28">{title}</span>
      <span>{info}</span>
    </p>
  );
};
