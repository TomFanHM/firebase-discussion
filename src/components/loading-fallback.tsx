import React from "react"

import { LoadingSpinner } from "./ui/loading-spinner"

type LoadingFallbackProps = {
  customFallbackImagePath: string | undefined
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  customFallbackImagePath,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {customFallbackImagePath ? (
        <div
          className="h-12 w-12 bg-contain bg-no-repeat"
          style={{ backgroundImage: customFallbackImagePath }}
        ></div>
      ) : (
        <LoadingSpinner size={24} />
      )}
      <span className="whitespace-nowrap text-center text-sm text-foreground/70">
        Loading Packages ...
      </span>
    </div>
  )
}
export default LoadingFallback
