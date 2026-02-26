const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-black">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mx-auto"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
