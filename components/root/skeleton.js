const UniversalSkeleton = () => {
    return (
        <div className="skeleton rounded overflow-hidden">
            {/* Skeleton Content */}
            <div className="skeleton-content h-4 mb-2 bg-gray-300 animate-pulse"></div>
            <div className="skeleton-content h-4 mb-2 bg-gray-300 animate-pulse"></div>
            <div className="skeleton-content h-4 bg-gray-300 animate-pulse"></div>
        </div>
    );
};

export default UniversalSkeleton;