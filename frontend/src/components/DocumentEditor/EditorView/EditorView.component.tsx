import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { StyledEditorView } from "./EditorView.style";

export interface EditorViewProps {
    applyFormatting: (command: string) => void;
    editorContent: string;
}

export const EditorView = forwardRef<
    EditorViewProps,
    { editorContent: string; onContentChange: (content: string) => void }
>((props, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        applyFormatting(command) {
            document.execCommand(command, false);
            editorRef.current?.focus();
        },
    }));

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== props.editorContent) {
            editorRef.current.innerHTML = props.editorContent;
        }
    }, [props.editorContent]);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const content = e.currentTarget.innerHTML;
        props.onContentChange(content);
    };

    return (
        <StyledEditorView
            ref={editorRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={handleInput}
        >
            {props.editorContent}
        </StyledEditorView>
    );
});
