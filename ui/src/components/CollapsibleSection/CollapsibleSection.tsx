import { ReactNode, useEffect, useRef, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import "./CollapsibleSection.scss";

export interface CollapsibleSectionProps {
	id: number;
	title: string;
	children: ReactNode;
	initialExpanded: boolean;
}

export default function CollapsibleSection(props: CollapsibleSectionProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [isExpanded, expandSection] = useState(props.initialExpanded);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current.clientHeight);
		}
	}, [isExpanded, props.children]);

	return (
		<div id="collapsible-section" onClick={() => expandSection(!isExpanded)}>
			<div className="collapisble-section-header">
				<span className="collapsible-section-title">{props.title}</span>
				{isExpanded ? (
					<ArrowUpOutlined className="collapsible-section-arrow" />
				) : (
					<ArrowDownOutlined className="collapsible-section-arrow" />
				)}
			</div>
			<div
				className={`collapisble-section-content ${isExpanded ? "collapsible-section-content-expanded" : ""}`}
				style={{ height: isExpanded ? contentHeight : "0px" }}
			>
				<div ref={contentRef}>{props.children}</div>
			</div>
		</div>
	);
}
