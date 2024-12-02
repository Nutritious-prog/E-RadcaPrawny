import { Modal, Upload } from "antd";
import { RootState } from "app/redux/store";
import { UserRole } from "app/redux/userRole/UserRole.type";
import { ActionsBar } from "components/DocumentEditor/ActionsBar/ActionsBar.component";
import { EditorView, EditorViewProps } from "components/DocumentEditor/EditorView/EditorView.component";
import { TextTools } from "components/DocumentEditor/TextTools/TextTools.component";
import { Header } from "components/Header/Header.component";
import { DocumentItem, MenuItem } from "components/Sidebar/Menu/Menu.utils";
import { Sidebar } from "components/Sidebar/Sidebar.component";
import { SidebarType } from "components/Sidebar/Sidebar.utils";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { StyledDocumentEditor } from "./DocumentEditor.style";
import { DocumentEditorService } from "./DocumentEditor.service";
import { FormOutlined } from "@ant-design/icons";
import { LegalActContentDTO, LegalActDTO, LegalActTagDTO } from "./DocumentEditor.dto";
import { toast } from "react-toastify";

export const DocumentEditor: FC = (): ReactElement => {
    const editorViewRef = useRef<EditorViewProps>(null);

    const [uploadVisible, setUploadVisible] = useState<boolean>(false);
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [editorContent, setEditorContent] = useState<string>("");
    const [legalActs, setLegalActs] = useState<LegalActDTO[]>([]);
    const [selectedTags, setSelectedTags] = useState<LegalActTagDTO[]>([]);
    const [selectedActId, setSelectedActId] = useState<number | null>(null);

    const role: UserRole = useSelector((state: RootState) => state.user.role);
    const token: string = useSelector((state: RootState) => state.user.token);
    const isAdmin: boolean = role === UserRole.ROLE_ADMIN;

    useEffect(() => {
        fetchLegalActs();
    }, []);

    const fetchLegalActs = async () => {
        const response = await DocumentEditorService.getLegalActs(token);
        if (response.success) {
            const legalActs = response.response;
            setLegalActs(legalActs);
            const documentItems: MenuItem[] = legalActs.map((act) => ({
                key: act.id.toString(),
                icon: <FormOutlined />,
                label: act.title,
            }));
            setDocuments(documentItems);
            if (legalActs.length > 0) {
                setEditorContent(legalActs[0].textContent || "");
                setSelectedTags(legalActs[0].legalActTags);
                setSelectedActId(legalActs[0].id);
            }
        }
    };

    const handleMenuClick = ({ key }: { key: string }) => {
        const selectedAct = legalActs.find((act) => act.id.toString() === key);
        console.log("selectedAct", selectedAct);
        if (selectedAct) {
            setEditorContent(selectedAct.textContent || "");
            setSelectedTags(selectedAct.legalActTags);
            setSelectedActId(selectedAct.id);
        }
    };

    const handleTagChange = (nextSelectedTags: string[]) => {
        const updatedTags = nextSelectedTags.map(
            (tagName) =>
                ({
                    tag: {
                        id: selectedActId,
                        name: tagName,
                    }
                }) as LegalActTagDTO
        );
        setSelectedTags(updatedTags);
        console.log("updatedTags", updatedTags);
    };

    const handleContentChange = (content: string) => {
        setEditorContent(content);
        console.log("content", content);
    };

    const handleSave = async () => {
        if (selectedActId !== null) {
            // Updating whole legal act content if user is admin
            if (isAdmin) {
                const updatedTags = selectedTags.map((tag) => ({
                    ...tag,
                }));
                console.log("updatedTags", updatedTags);

                const updatedAct: LegalActDTO = {
                    ...legalActs.find((act) => act.id === selectedActId)!,
                    textContent: editorContent,
                    legalActTags: selectedTags,
                };
                console.log("updatedAct", updatedAct);

                const response = await DocumentEditorService.updateLegalAct(selectedActId, updatedAct);
                if (response.success) {
                    toast.success("Zaktualizowano dokument");
                    fetchLegalActs();
                } else {
                    toast.error("Błąd podczas aktualizacji dokumentu");
                }

                const currentTags = legalActs.find((act) => act.id === selectedActId)!.legalActTags;
                const currentTagNames = currentTags.map((tag) => tag.tag.name);
                const newTagNames = updatedTags.map((tag) => tag.tag.name);

                const tagsToAdd = updatedTags.filter((tag) => !currentTagNames.includes(tag.tag.name));
                const tagsToRemove = currentTags.filter((tag) => !newTagNames.includes(tag.tag.name));

                console.log("Tags to add:", tagsToAdd);
                console.log("Tags to remove:", tagsToRemove);

                if (tagsToAdd.length === 1) {
                    await DocumentEditorService.addTagToLegalAct(selectedActId, tagsToAdd[0]);
                } else if (tagsToAdd.length > 0) {
                    await DocumentEditorService.addMultipleTagsToLegalAct(selectedActId, tagsToAdd);
                }

                if (tagsToRemove.length > 0) {
                    await DocumentEditorService.removeMultipleTagsFromLegalAct(selectedActId, tagsToRemove);
                }
            // Updating only content if user is not admin
            } else {
                const legalActContentDTO: LegalActContentDTO = {
                    content: editorContent,
                };

                const response = await DocumentEditorService.updateLegalActContent(selectedActId, legalActContentDTO);
                if (response.success) {
                    toast.success("Zaktualizowano treść dokumentu");
                    fetchLegalActs();
                } else {
                    toast.error("Błąd podczas aktualizacji treści dokumentu");
                }
            }
        }
    };

    return (
        <StyledDocumentEditor>
            <div className="w-3/12 h-full">
                <Sidebar type={SidebarType.DOCUMENTS} menuItems={documents} onMainMenuClickHandler={handleMenuClick} />
            </div>
            <div className="w-9/12 flex flex-col">
                <Header />
                <div className="w-full flex-grow flex justify-end h-full">
                    <div className="w-9/12 h-[90%]">
                        {/*<TextTools editorRef={editorViewRef} />*/}
                        <EditorView
                            ref={editorViewRef}
                            editorContent={editorContent}
                            onContentChange={handleContentChange}
                        />
                    </div>
                    <div className="w-3/12 h-full">
                        <ActionsBar tags={selectedTags} onSave={handleSave} onTagChange={handleTagChange} />
                    </div>
                </div>
            </div>

            {isAdmin && (
                <Modal
                    open={uploadVisible}
                    title="Dodaj nowy dokument"
                    onCancel={() => setUploadVisible(false)}
                    footer={null}
                    centered={true}
                >
                    <Upload />
                </Modal>
            )}
        </StyledDocumentEditor>
    );
};
