import "./FullLoading.css";

const FullLoading = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-300/70 backdrop-blur-sm">

            <div className="flex flex-col items-center gap-4 p-6 bg-base-100 rounded-box shadow-xl loading-container">

                <span className="loading loading-dots loading-lg text-secondary"></span>

                <span className="text-xl font-bold text-base-content">
                    Loading...
                </span>
            </div>

        </div>
    );
}

export default FullLoading;