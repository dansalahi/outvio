import { FC } from "react";

const NoResultsFound: FC = () => {
    return (
        <div className="flex items-center justify-center h-32">
            <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">No Results Found</p>
                <p className="text-gray-600">We couldn't find any matches for your search.</p>
            </div>
        </div>
    );
};

export default NoResultsFound;
