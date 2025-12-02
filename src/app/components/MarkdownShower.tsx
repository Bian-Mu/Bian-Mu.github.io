import FadeEdge from "./FadeEdge";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownShowerProps {
    currentPost: string | null;
}



const MarkdownShower: React.FC<MarkdownShowerProps> = ({ currentPost }) => {
    const [content, setContent] = useState<string>("");
    const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentPost) {
            axios
                .get(`/api/post?path=${currentPost}`, { responseType: "text" })
                .then((res) => {
                    setContent(res.data);
                    const headingRegex = /^###\s+(.+)$/gm;
                    const matches = [];
                    let match;
                    while ((match = headingRegex.exec(res.data)) !== null) {
                        const text = match[1];
                        const id = "h3-" + text.toString();
                        matches.push({ text, id });
                    }
                    setHeadings(matches);
                })
                .catch((err) => setContent("加载失败: " + err.message));
        } else {
            setContent("");
            setHeadings([]);
        }
    }, [currentPost]);


    return (
        <div className="gap-1 grid grid-cols-4 min-h-full w-full">
            <div
                className="col-span-3 bg-background p-6 overflow-y-auto h-[calc(100vh)] no-scrollbar" ref={contentRef}>
                {content ? (
                    <div className=" max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                            h3: (props) => {
                                return (
                                    <h3 id={"h3-" + props.children?.toString()}>{props.children}</h3>
                                )
                            }
                        }}>{content}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                        个人记录学习中...
                    </div>
                )}
            </div>
            <div className="col-span-1">
                <div className="p-4 bg-background overflow-y-auto no-scrollbar h-[700px]">
                    <h4>目录</h4>
                    <ul className="space-y-1">
                        {headings.map((heading, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        const element = document.getElementById(heading.id);
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: 'smooth', block: 'nearest'
                                            });
                                        }
                                    }}
                                    className="text-left text-m block py-0.5"
                                >
                                    {heading.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <FadeEdge height={220} toBottom={false} opacity={100} />
            </div>
        </div>
    );
};

export default MarkdownShower;
