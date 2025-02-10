// Components/sessions/SessionTabs.jsx
export default function SessionTabs({
  activeTab,
  setActiveTab,
  setCurrentPage,
}) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
        {["upcoming", "past", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`${
              activeTab === tab
                ? "border-custom text-custom"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
          >
            {tab} Sessions
          </button>
        ))}
      </nav>
    </div>
  );
}
