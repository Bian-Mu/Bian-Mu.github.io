import { PostCategory } from "../lib/postUtils";
import FadeEdge from "./FadeEdge";
import { useState } from "react";


interface SiderBarProps {
    categories: PostCategory[];
    onPostSelect: (path: string) => void;
}

const SiderBar: React.FC<SiderBarProps> = ({ categories, onPostSelect }) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (path: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const renderTree = (items: PostCategory[]) => {
        return (
            <ul className="space-y-1.5 overflow-y-auto no-scrollbar h-[400px]">
                {items.map((category) => (
                    <li key={category.path}>
                        <div
                            className="text-xl cursor-pointer  text-gray-800 dark:text-gray-200 p-1 flex items-center"
                            onClick={() => toggleFolder(category.path)}
                        >
                            <span className="mr-1">
                                {category.name}
                            </span>
                        </div>
                        {category.children.length > 0 && expandedFolders.has(category.path) && (
                            <ul className="ml-4 space-y-0">
                                {category.children.map((item) => (
                                    <li key={item.path}>
                                        <button
                                            onClick={() => onPostSelect(item.path)}
                                            className="text-left  text-blue-400 hover:text-blue-600 text-l p-1"
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="min-h-full max-w-xl ">
            <FadeEdge height={200} toBottom={true} opacity={100} />
            <div className="flex flex-row p-4 bg-background">
                <div className="mx-4 mt-4">
                    <img src="/avatar.jpg" width={100} height={100} alt="Avatar" />
                </div>
                <span className="self-center text-2xl">A,Border,Collie</span>
            </div>
            <div className="pt-5 px-4  h-[400px] bg-background">
                {renderTree(categories)}
            </div>
            <FadeEdge height={200} toBottom={false} opacity={100} />
        </div>
    );
};

export default SiderBar;