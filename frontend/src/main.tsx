import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootContainer: Element | DocumentFragment | null =
	document.getElementById("root");

const ToDo = () => {
	return <p>hey</p>;
};

if (rootContainer) {
	const root = createRoot(rootContainer);
	root.render(
		<StrictMode>
			<ToDo />
		</StrictMode>,
	);
}
