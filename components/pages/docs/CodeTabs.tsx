// Component for displaying code tabs (Node.js & Python)

import { useState } from "react";

const CodeTabs = ({ nodeCode, pythonCode }: { nodeCode: string; pythonCode: string }) => {
    const [activeTab, setActiveTab] = useState("node");

    return (
        <div>
            {/* Tab Buttons */}
            <div className="flex mb-2 border-b border-gray-300">
                <button
                    onClick={() => setActiveTab("node")}
                    className={`px-4 py-2 focus:outline-none ${activeTab === "node"
                        ? "border-b-2 border-blue-500 text-blue-500 hover:bg-gray-100"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                        }`}
                >
                    Node.js
                </button>
                <button
                    onClick={() => setActiveTab("python")}
                    className={`px-4 py-2 focus:outline-none ${activeTab === "python"
                        ? "border-b-2 border-blue-500 text-blue-500 hover:bg-gray-100"
                        : "text-gray-600 hover:text-blue-500  hover:bg-gray-100"
                        }`}
                >
                    Python
                </button>
            </div>

            {/* Code Display */}
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto text-sm">
                <code>{activeTab === "node" ? nodeCode : pythonCode}</code>
            </pre>
        </div>
    );
};

export default CodeTabs;	
