import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {StyledEditorView} from "./EditorView.style";

export interface EditorViewProps {
	applyFormatting: (command: string) => void;
}

export const EditorView = forwardRef<EditorViewProps>((props, ref) => {
	const editorRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => ({
		// to be continued
		applyFormatting(command) {
			document.execCommand(command, false);
			editorRef.current?.focus();
		},
	}));

	const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
		// to be continued
		console.log("Content:", e.currentTarget.innerHTML);
	};

	return (
		<StyledEditorView
			ref={editorRef}
			contentEditable={true}
			suppressContentEditableWarning={true}
			onInput={handleInput}>
			Start editing here...
		</StyledEditorView>
	);
});
