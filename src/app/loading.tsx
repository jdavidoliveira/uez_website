import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner color="text-gray-300" />
        </div>
      );
}