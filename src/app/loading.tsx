import LoadingSpinner from "@/components/layout/LoadingSpinner"

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <LoadingSpinner color="text-gray-300" />
    </div>
  )
}
